namespace API.Dtos
{
    //Sent by the API after client request
    public class UserDto
    {
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string  Token { get; set; }
    }
}