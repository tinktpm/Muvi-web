package com.microservice.notificationservice.service;

import com.microservice.notificationservice.model.AccountNotification;

import java.util.List;

public interface AccountNotificationService {
    public List<AccountNotification> getAccountNotifications(String userID, int page, int size);
    public AccountNotification getAccountNotification(String id);
    public AccountNotification addAccountNotification(AccountNotification accountNotification);
    public AccountNotification readNotification(String notificationID);
}
