package com.microservice.paymentservice.service;

import com.microservice.paymentservice.model.Bill;

import java.util.List;

public interface BillService {
    public List<Bill> getBills(String userID);
    public Bill getBill(String id);
    public Bill addBill(Bill bill);
}
