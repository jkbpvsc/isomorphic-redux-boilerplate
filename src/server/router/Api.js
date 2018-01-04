import { Router } from 'express';

const router = new Router();

router.get('/timeout', function (req, res)
{
    setTimeout(function ()
    {
        res.send({
            status: 'success',
            data: {
                time: Date.now() - req.query.start
            }
        });
    }, 200);
});


export default router