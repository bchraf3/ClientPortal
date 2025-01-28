package com.moyo.clientportal.repository;

import com.moyo.clientportal.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}