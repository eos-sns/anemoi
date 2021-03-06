<div align="center" id="topOfReadme">
	<h1>EOS | Anemoi</h1>
	<em>Translates download links to actual files</em></br>


<a href="https://github.com/eos-sns/anemoi/pulls"><img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103"></a> <a href="https://github.com/eos-sns/anemoi/issues"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat"></a> <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a> <a href="https://saythanks.io/to/sirfoga"><img src="https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg" alt="Say Thanks!" /></a>
</div>


## Use case
You want to serve stuff like `server.com/download?token=327892`. You have a database and input data via [astraeus](https://github.com/eos-sns/astraeus)

## Example
```js
app.get('/download', (req, res) => {
  const downloadToken = req.query.token.toString();
  const realDownload = new Anemoi().get(downloadToken); // it's a promise
  realDownload.then((val) => {
    if (val) {
      res.download(val);
    }
    else {
      res.sendStatus(403); // token is not valid
    }
  });
});
```

## Install
```bash
$ npm install
```

### Dependencies
```bash
$ $(which pkg manager) install memcached libmemcached-tools  # install memcache
```

## Contributing
[Fork](https://github.com/eos-sns/anemoi/fork) | Patch | Push | [Pull request](https://github.com/eos-sns/anemoi/pulls)

## Feedback
Suggestions and improvements are [welcome](https://github.com/eos-sns/anemoi/issues)!

## Authors

| [![sirfoga](https://avatars0.githubusercontent.com/u/14162628?s=128&v=4)](https://github.com/sirfoga "Follow @sirfoga on Github") |
|---|
| [Stefano Fogarollo](https://sirfoga.github.io) |

## License
All of the codebases are **[MIT licensed](https://opensource.org/licenses/MIT)** unless otherwise specified.

**[Back to top](#topOfReadme)**
