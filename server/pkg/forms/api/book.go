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
}
