import path from "path";
import express from "express";
import webpack from "webpack";
import webpackConfig from "../webpack.config";
import { additionMiddleware } from './middleware';

export const app = express();
const port = process.env.PORT || 3000;

app.get('/add/:a/:b', additionMiddleware);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

let compiler = webpack(webpackConfig);
app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    lazy: true,
    publicPath: webpackConfig.output && webpackConfig.output.publicPath || '',
    stats: { colors: true }
  })
);
app.use(require("webpack-hot-middleware")(compiler));
app.use(express.static(path.resolve(__dirname, "dist")));

if (!module.parent)
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });