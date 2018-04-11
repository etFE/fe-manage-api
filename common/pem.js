const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

/**
 * 生成token
 */
export const generateToken = (data) => {
    const created = Math.floor(Date.now() / 1000)
    const cert = fs.readFileSync(path.join(__dirname, 'static/pem/private_key.pem'))
    const token = jwt.sign({
        data,
        exp: created + 3600 * 24
    }, cert, { algorithm: 'RS256' })

    return token
}

/**
 * 验证token
 */
export const verifyToken = (token) => {
    const cert = fs.readFileSync(path.join(__dirname, 'static/pem/public_key.pem'))
    let res

    try {
        const result = jwt.verify(token, cert, { algorithm: 'RS256' }) || {}
        const { exp = 0 } = result
        // TODO: 未完
        const current = Math.floor(Date.now() / 1000)
        if ( current <= exp ) {
            res = result.data || {};
        }
    } catch (error) {

    }

    return res
}
