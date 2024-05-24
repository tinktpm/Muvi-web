package com.microservice.paymentservice.service.implement;

import com.microservice.paymentservice.client.UserServiceClient;
import com.microservice.paymentservice.model.Bill;
import com.microservice.paymentservice.repository.BillRepository;
import com.microservice.paymentservice.service.BillService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ImplBillService implements BillService {

    @Autowired
    private UserServiceClient userServiceClient;

    @Autowired
    private BillRepository billRepository;

    @Override
    public List<Bill> getBills(String userID) {
        return billRepository.findByUserID(userID);
    }

    @Override
    public Bill getBill(String id) {
        return billRepository.findById(id).orElse(null);
    }

    @Override
    public Bill addBill(Bill bill) {
        try {
            Bill stored = billRepository.insert(bill);
            ResponseEntity<String> response = userServiceClient.getUserById(bill.getUserID());
            JSONObject jsonObject = new JSONObject(response.getBody());

            Map<String, Object> userMap = jsonObject.toMap();
            userMap.put("isVip", true);
            userServiceClient.updateAccountUser(userMap.get("_id").toString(), userMap);
            return stored;
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
