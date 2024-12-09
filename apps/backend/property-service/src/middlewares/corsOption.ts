import configs from "../config";

export const corsOption = {
    origin: configs.clientUrl,
    credentials: true,
    methods: ['GET','POST','DELETE','PUT']
}