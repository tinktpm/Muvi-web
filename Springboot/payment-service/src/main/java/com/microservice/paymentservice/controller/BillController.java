package com.microservice.paymentservice.controller;

import com.microservice.paymentservice.ResponseMessage;
import com.microservice.paymentservice.model.Bill;
import com.microservice.paymentservice.service.BillService;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Scanner;

@RestController
@RequestMapping("/api/v1/payment")
public class BillController {
    private Bill bill = new Bill();

    @Value("${paypal.client-id}")
    private String paypal_client_id;
    @Value("${paypal.secret}")
    private String paypal_secret;

    @Autowired
    private BillService billService;

    @PostMapping("/create-bill")
    public ResponseEntity<Object> createBill(@RequestBody Bill bill){
        Payment payment = new Payment();
        payment.setIntent("sale");

        Payer payer = new Payer();
        payer.setPayerInfo(new PayerInfo().setEmail("sb-phqfa30568095@personal.example.com"));
        payer.setPaymentMethod("paypal");
        payment.setPayer(payer);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setReturnUrl("http://localhost:8086/api/v1/payment/execute-payment");
        redirectUrls.setCancelUrl("http://localhost:8086/api/v1/payment/cancel-payment");
        payment.setRedirectUrls(redirectUrls);

        Transaction transaction = new Transaction();
        Amount amount = new Amount();
        amount.setCurrency("USD");
        amount.setTotal(String.valueOf(bill.getTotal()));
        transaction.setAmount(amount);
        this.bill = bill;

        payment.setTransactions(Collections.singletonList(transaction));

        try{
            APIContext apiContext = new APIContext(paypal_client_id, paypal_secret, "sandbox");
            Payment createdPayment = payment.create(apiContext);
            return ResponseMessage.createResponse(HttpStatus.OK, "CREATE PAYMENT SUCCESSFULLY!", createdPayment.getLinks().get(1).getHref());
        } catch (Exception e){
            e.printStackTrace();
            return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "CREATE PAYMENT FAILED!", null);
        }
    }

    @GetMapping("/execute-payment")
    public RedirectView executePayment(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerID){
        try {
            APIContext apiContext = new APIContext(paypal_client_id, paypal_secret, "sandbox");
            Payment payment = Payment.get(apiContext, paymentId);
            PaymentExecution paymentExecution = new PaymentExecution();
            paymentExecution.setPayerId(payerID);

            System.out.print("Bill: " + bill);
            bill.setCreatedAt(LocalDateTime.now());
            billService.addBill(this.bill);

            Payment executedPayment = payment.execute(apiContext, paymentExecution);
//            return ResponseMessage.createResponse(HttpStatus.OK, "PAY SUCCESSFULLY!", executedPayment.getState());
            return new RedirectView("http://localhost:5173");
        } catch (PayPalRESTException e) {
//            return ResponseMessage.createResponse(HttpStatus.INTERNAL_SERVER_ERROR, "PAY FAILED, PLEASE CHECK PAYMENT INFORMATION AGAIN!", null);
            return new RedirectView("http://localhost:5173");
        }
    }

    @GetMapping("cancel-payment")
    public ResponseEntity<Object> cancelPayment(){
        return ResponseMessage.createResponse(HttpStatus.OK, "CANCEL PAYMENT!", null);
    }
}
