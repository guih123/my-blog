import { format } from 'date-fns'; 
import { NextApiRequest, NextApiResponse } from 'next';
import md5 from 'md5';
import { encode } from 'js-base64';
import request from 'service/fetch';
import { withIronSessionApiRoute } from "iron-session/next";
import { ISession } from 'pages/api/index';
import { ironOptions } from 'config/index'


export default withIronSessionApiRoute(sendVerifyCode, ironOptions);

async function sendVerifyCode (req: NextApiRequest,res: NextApiResponse) {
    const session:ISession = req.session;

    const { to = '', templateId = '1' } = req.body;
    // 前后端数据传递没有问题
    // 需要发送短信
    // const AppId = '8aaf07087d7fb5f6017d950ce83f04e1';
    // const AccountId = '8aaf07087d7fb5f6017d950ce72c04da';
    // const AuthToken = '91725ff244364cda9f1e1ea7d471e124';
    const AppId = '8a216da882f1f59401835f219dc8150c';
    const AccountId = '8aaf070882ede8b301835f1ebf4b15cb';
    const AuthToken = '05e21474fb6247799f742f58f2ff93dc';

    const NowDate = format(new Date(), 'yyyyMMddHHmmss');
    const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`);
    const Authorization = encode(`${AccountId}:${NowDate}`);
    const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    const expireMinute = '5';

    const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;
    const response = await request.post(url, {
        to,
        templateId,
        appId: AppId,
        datas: [verifyCode,expireMinute],
    },{
        headers: {
          Authorization
        }
    })
    console.log(response);
    const { statusCode, statusMsg } = response as any;

    if(statusCode === '000000'){
        session.verifyCode = verifyCode;
        await session.save();
    } else {
        res.status(200).json({
            code: statusCode,
            msg: statusMsg,
            data: {
                name: 'tomas'
            }
        });
    }

    res.status(200).json({
        code: 0,
        data: 123,
    });
}

