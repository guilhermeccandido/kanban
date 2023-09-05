import { FC } from "react"

type AppLayoutProps = {
    children: JSX.Element
}

const AppLayout: FC<AppLayoutProps> = ({children}) => {
    return <>{children}</>
}

export default AppLayout