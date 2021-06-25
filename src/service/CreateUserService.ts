import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean
    password: string
}

class CreateUserService {

    async execute({ name, email, admin = false, password  }: IUserRequest) {
        const UsersRepository = getCustomRepository(UsersRepositories)
        const userAlreadyExists = await UsersRepository.findOne({ email })

        if (!email) throw new Error ('E-mail incorrect')
        if (userAlreadyExists) throw new Error('User already exists')

        const passwordHash = await hash(password, 8)

        const user = UsersRepository.create({ 
            name, 
            email, 
            admin,
            password: passwordHash,
        })
        await UsersRepository.save(user)

        return user
    }
}

export { CreateUserService }