package api

type ResponseBook struct {
	Title        string
	Thumbnailurl string
}

type Books struct {
	Response []ResponseBook
}
