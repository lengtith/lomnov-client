import configs from "../config"
const corsOptions = {
    origin: configs.clientUrl,
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','PATCH']
}
export default corsOptions;