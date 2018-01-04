const index = (helmet = {}, appHtml = '', initialState = {}) => (
`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${ helmet.title.toString() }
    
    <script>
        window.__INITIAL_STATE__ = ${ JSON.stringify(initialState) }
    </script>
    
    <script type="text/javascript" src="/bundle.js"></script>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <main id="app">${ appHtml }</main>
</body>
</html>`
);

export default index