package api

type Book struct {
	ID     uint
	Title  string
	Author string
}

type ResponseBook struct {
	Title        string
	Thumbnailurl string
	CanAccess    bool
}
