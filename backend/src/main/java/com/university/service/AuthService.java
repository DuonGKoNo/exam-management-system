package com.university.service;

import com.university.dto.LoginRequest;
import com.university.model.User;
import com.university.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> authenticate(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isEmpty()) {
            return Optional.empty();
        }

        User user = userOpt.get();
        // Kiểm tra khóa tài khoản (BR09: Khóa tạm 15 phút nếu sai 5 lần)
        if ("LOCKED".equals(user.getStatus()) && user.getLockedUntil() != null) {
            if (user.getLockedUntil().isAfter(LocalDateTime.now())) {
                throw new RuntimeException("Tài khoản đang bị khóa tạm thời. Vui lòng thử lại sau.");
            } else {
                user.setStatus("ACTIVE");
                user.setFailedLoginCount(0);
                user.setLockedUntil(null);
            }
        }

        // Kiểm tra mật khẩu (Skeleton logic)
        if (user.getPasswordHash().equals(request.getPassword())) {
            user.setFailedLoginCount(0);
            userRepository.save(user);
            return Optional.of(user);
        } else {
            int failed = user.getFailedLoginCount() + 1;
            user.setFailedLoginCount(failed);
            if (failed >= 5) {
                user.setStatus("LOCKED");
                user.setLockedUntil(LocalDateTime.now().plusMinutes(15));
            }
            userRepository.save(user);
            return Optional.empty();
        }
    }
}
