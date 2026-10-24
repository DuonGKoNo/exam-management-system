package com.university.controller;

import com.university.dto.LoginRequest;
import com.university.model.User;
import com.university.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Optional<User> userOpt = authService.authenticate(request);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Đăng nhập thành công");
                response.put("userId", user.getUserId());
                response.put("fullName", user.getFullName());
                response.put("role", user.getRole());
                response.put("token", "dummy-jwt-token-skeleton");
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.status(401).body(Map.of("message", "Sai tên đăng nhập hoặc mật khẩu"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
