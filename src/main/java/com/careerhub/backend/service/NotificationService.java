package com.careerhub.backend.service;

import com.careerhub.backend.entity.Notification;
import com.careerhub.backend.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndIsRead(userId, false);
    }

    public Notification markAsRead(Long id) {

        Notification notification =
                notificationRepository.findById(id).orElse(null);

        if (notification != null) {
            notification.setRead(true);
            return notificationRepository.save(notification);
        }

        return null;
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}