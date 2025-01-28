package com.moyo.clientportal.service;

import com.moyo.clientportal.config.RabbitMQConfig;
import com.moyo.clientportal.dto.OrderDTO;
import com.moyo.clientportal.model.Order;
import com.moyo.clientportal.repository.OrderRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class OrderProcessorService {
    private final OrderRepository orderRepository;

    public OrderProcessorService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @RabbitListener(queues = RabbitMQConfig.QUEUE_ORDERS)
    public void processOrder(OrderDTO orderDTO) {
        try {
            Thread.sleep(5000); // Simulate processing time
            Order order = orderRepository.findById(orderDTO.getId())
                .orElseThrow(() -> new RuntimeException("Order not found"));
            order.setStatus("PROCESSED");
            orderRepository.save(order);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}