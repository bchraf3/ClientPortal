package com.moyo.clientportal.service;

import com.moyo.clientportal.config.RabbitMQConfig;
import com.moyo.clientportal.dto.OrderDTO;
import com.moyo.clientportal.model.Order;
import com.moyo.clientportal.model.Product;
import com.moyo.clientportal.repository.OrderRepository;
import com.moyo.clientportal.repository.ProductRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final RabbitTemplate rabbitTemplate;

    public OrderService(
        OrderRepository orderRepository, 
        ProductRepository productRepository,
        RabbitTemplate rabbitTemplate
    ) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.rabbitTemplate = rabbitTemplate;
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Product product = productRepository.findById(orderDTO.getProductId())
            .orElseThrow(() -> new RuntimeException("Product not found"));

        Order order = new Order();
        order.setProduct(product);
        order.setQuantity(orderDTO.getQuantity());
        order.setStatus("PENDING");
        order.setCreatedAt(LocalDateTime.now());

        Order savedOrder = orderRepository.save(order);
        OrderDTO savedOrderDTO = convertToDTO(savedOrder);

        // Publish order created event
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE_ORDERS,
            RabbitMQConfig.ROUTING_KEY_ORDERS,
            savedOrderDTO
        );

        return savedOrderDTO;
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setProductId(order.getProduct().getId());
        dto.setProductName(order.getProduct().getName());
        dto.setProductDescription(order.getProduct().getDescription());
        dto.setProductPrice(order.getProduct().getPrice());
        dto.setQuantity(order.getQuantity());
        dto.setStatus(order.getStatus());
        dto.setCreatedAt(order.getCreatedAt());
        return dto;
    }

}