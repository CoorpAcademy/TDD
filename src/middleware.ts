import { Response, Request } from "express";
import { addition, division } from "./operations";

export const additionMiddleware = (req: Request, res: Response) => {
  const { a, b } = req.params;

  const A = parseInt(a, 10);
  const B = parseInt(b, 10);

  const result = addition(A, B);

  res.send(`${result}`);
};

export const divisionMiddleware = (req: Request, res: Response) => {
  const { a, b } = req.params;

  const A = parseInt(a, 10);
  const B = parseInt(b, 10);

  const result = division(A, B);
  
  if (result === Infinity) 
    return res.status(500).send('Division by zero');
  
  res.send(`${result}`);
};
