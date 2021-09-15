package models

import (
	"github.com/dorayaki-do/dorayaki-do/pkg/models"
	"github.com/dorayaki-do/dorayaki-do/pkg/repository"
)

func GetEventByLocation(latitude string, longitude string) (models.Event, error) {
	var event models.Event

	if err := repository.DB.Table("events").
		Where("events.latitude = ?", latitude).
		Where("events.longitude= ?", longitude).
		First(&event).Error; err != nil {
		return event, err
	}
	return event, nil
}