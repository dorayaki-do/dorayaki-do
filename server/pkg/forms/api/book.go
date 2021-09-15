package api

type Book struct {
	ID     uint
	Title  string
	Author string
}

type ResponseBook struct {
	ID           uint
	Title        string
	Thumbnailurl string
	CanAccess    bool
}

type ResponseEvent struct {
	ID          uint
	Title       string
	Description string
	Latitude    string
	Longitude   string
}
