using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize] //jeton d'autorisation (token) pour tous les endpoints pour autoriser 1 seul decorer le endpoint par [AllowAnonymous]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();
            var MembersDto = _mapper.Map<IEnumerable<MemberDto>>(users);
            return Ok(MembersDto);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUserByUsername(string username)
        {
            var user = await _userRepository.GetUserByUserNameAsync(username);
            var memberDto = _mapper.Map<MemberDto>(user);
            return memberDto;
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<AppUser>> GetUserById(int id)
        // {
        //     return await _userRepository.GetUserByIdAsync(id);
        // }
    }
}
