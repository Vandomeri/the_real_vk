import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Form() {
    return (
        <form className="max-w-[500px] mx-auto flex flex-col gap-y-5">
            <Input placeholder="Имя" type="text" />
            <Input placeholder="Отчество" type="text" />
            <Input placeholder="Фамилия" type="text" />
            <Input placeholder="E-mail" type="email" />
            <Input placeholder="Телефон" type="tel" />
            <Input placeholder="Пароль" type="password" />

            <Button type="submit">Зарегестрироваться</Button>
        </form>
    )
}
