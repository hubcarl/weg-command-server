# weg-command-server

## 相比fis3支持如下特性

1.插件weg-command-server 解决了fis3的默认server不自动安装package.json依赖问题.
2.插件weg-command-server 解决了fis3不能指定node启动入口文件，weg server start –entry app.js.
3.插件weg-command-server 支持控制台或者命令行显示log日志功能.
4.插件weg-command-server 支持了监听服务器文件修改自动重启node server的功能.

## Usage

```
  Usage: server <command> [options]

  Commands:

    start                  start server
    stop                   shutdown server
    restart                restart server
    info                   output server info
    open                   open document root directory
    clean                  clean files in document root
    install <name>         install server framework

  Options:

    -h, --help                     output usage information
    -p, --port <int>               server listen port
    --root <path>                  document root
    --entry <path>                 node start file(weg server start --entry app.js   default entry:server.js)
    --type <php|java|node>         process language
    --rewrite [script]             enable rewrite mode
    --repos <url>                  install repository
    --timeout <seconds>            start timeout
    --php_exec <path>              path to php-cgi executable file
    --php_exec_args <args>         php-cgi arguments
    --php_fcgi_children <int>      the number of php-cgi processes
    --php_fcgi_max_requests <int>  the max number of requests
    --registry <registry>          set npm registry
    --include <glob>               clean include filter
    --exclude <glob>               clean exclude filter
```
