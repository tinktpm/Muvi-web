package com.microservice.notificationservice.service.implement;

import com.microservice.notificationservice.model.AccountNotification;
import com.microservice.notificationservice.model.CommentNotification;
import com.microservice.notificationservice.repository.AccountNotificationRepository;
import com.microservice.notificationservice.service.AccountNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImplAccountNotificationService implements AccountNotificationService {

    @Autowired
    private AccountNotificationRepository accountNotificationRepository;

    @Override
    public List<AccountNotification> getAccountNotifications(String userID, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        return accountNotificationRepository.findByUserID(pageable, userID).getContent();
    }

    @Override
    public AccountNotification getAccountNotification(String id) {
        return accountNotificationRepository.findById(id).orElse(null);
    }

    @Override
    public AccountNotification addAccountNotification(AccountNotification accountNotification) {
        try{
            return accountNotificationRepository.save(accountNotification);
        } catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public AccountNotification readNotification(String notificationID){

        try {
            AccountNotification accountNotification = getAccountNotification(notificationID);
            if(accountNotification != null){
                accountNotification.setRead(true);
                return accountNotificationRepository.save(accountNotification);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
