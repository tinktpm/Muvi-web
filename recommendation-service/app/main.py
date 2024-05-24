import os
from typing import Optional, List

from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response
from pydantic import ConfigDict, BaseModel, Field, EmailStr
from pydantic.functional_validators import BeforeValidator

from typing_extensions import Annotated

from bson import ObjectId
import motor.motor_asyncio
from pymongo import ReturnDocument
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

import pandas as pd
import py_eureka_client.eureka_client as eureka_client
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    await eureka_client.init_async(
        eureka_server="http://localhost:8761/,http://eureka-server:8761/",
        app_name="recommendation-service",
        instance_port=8083,
        instance_host="localhost"
    )
    # Retrieve movie data during startup
    global movie_data
    global indices_movie
    global cosine_sim_movie
    global tv_show_data
    global indices_tv_show
    global cosine_sim_tv_show
    movie_data = await get_movie_data()
    movie_data = pd.DataFrame(movie_data)

    tv_show_data = await get_tv_show()
    tv_show_data = pd.DataFrame(tv_show_data)

    #Replace NaN with an empty string
    movie_data['description'] = movie_data['description'].fillna('')
    tv_show_data['description'] = tv_show_data['description'].fillna('')
    
    #Construct the required TF-IDF matrix by fitting and transforming the data
    tfidf_matrix_movie = tfidf.fit_transform(movie_data['description'])
    tfidf_matrix_tv_show = tfidf.fit_transform(tv_show_data['description'])

    cosine_sim_movie = linear_kernel(tfidf_matrix_movie, tfidf_matrix_movie)
    cosine_sim_tv_show = linear_kernel(tfidf_matrix_tv_show, tfidf_matrix_tv_show)

    indices_movie = pd.Series(movie_data.index, index=movie_data['name']).drop_duplicates()
    indices_tv_show= pd.Series(tv_show_data.index, index=tv_show_data['name']).drop_duplicates()
    
    print("Movie data retrieved successfully during startup.")
    yield


app = FastAPI(
    lifespan=lifespan,
    title="Recommendation System - FastAPI",
    summary="A sample application showing how to use FastAPI to add a ReST API to a MongoDB collection.",
    openapi_url="/api/v1/recommendation-swagger/v3/api-docs",

)


client = motor.motor_asyncio.AsyncIOMotorClient("mongodb+srv://nguyenhuutin124:nguyenhuutin124@cluster0.qaj6t7u.mongodb.net/film?retryWrites=true&w=majority")
db = client.film
movie_collection = db.get_collection("movie")
tv_show_collection = db.get_collection("tv_show")

tfidf = TfidfVectorizer(stop_words='english')

movie_data = []
tv_show_data = []
cosine_sim_movie = None
indices_movie = None
cosine_sim_tv_show = None
indices_tv_show = None

async def get_movie_data():
    movie_data = await movie_collection.find().to_list(length=None) 
    return movie_data

async def get_tv_show():
    tv_show_data = await tv_show_collection.find().to_list(length=None) 
    return tv_show_data

def get_recommendation_movie(title: str):
    result = []
    try:
        idx_movie = indices_movie[title]

        sim_scores_movie = list(enumerate(cosine_sim_movie[idx_movie]))

        sim_scores_movie = sorted(sim_scores_movie, key=lambda x: x[1], reverse=True)

        sim_scores_movie = sim_scores_movie[1:11]

        movie_indices_movie = [i[0] for i in sim_scores_movie]

        for value in movie_data['_id'].iloc[movie_indices_movie]:
            if isinstance(value, ObjectId):
                result.append(str(value))
            else:
                result.append(value)
        return result
    except:
        return result

def get_recommendation_tv_show(title: str):
    result = []
    try:
        idx_tv_show = indices_tv_show[title]

        sim_scores_tv_show = list(enumerate(cosine_sim_tv_show[idx_tv_show]))

        sim_scores_tv_show = sorted(sim_scores_tv_show, key=lambda x: x[1], reverse=True)

        sim_scores_tv_show = sim_scores_tv_show[1:11]

        tv_show_indices_tv_show = [i[0] for i in sim_scores_tv_show]

        for value in tv_show_data['_id'].iloc[tv_show_indices_tv_show]:
            if isinstance(value, ObjectId):
                result.append(str(value))
            else:
                result.append(value)
        return result
    except:
        return result


@app.get("/api/v1/recommendation", response_description="Get recommendation", status_code=status.HTTP_200_OK)
async def get_recommendation(userID: str, title: str):
    result_movie = get_recommendation_movie(title)
    result_tv_show = get_recommendation_tv_show(title)

    result = {"movie": result_movie, "tv_show": result_tv_show}

    return {"data": result}

