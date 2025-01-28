package com.moyo.clientportal.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OrderDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String productDescription;
    private Double productPrice;
    private Integer quantity;
    private String status;
    private LocalDateTime createdAt;
}