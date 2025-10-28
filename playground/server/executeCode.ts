import type {
    Response,
    Request
} from 'express'

export default function executeCode(req: Request, res: Response) {
    const { code } = req.body
    // TODO: Implement proper source code handling
    console.log(code)
}