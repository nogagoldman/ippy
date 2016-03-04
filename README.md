# ippy
An emoji copy and categorizer

## Local Setup

1. [Install RVM](https://rvm.io/rvm/install) (or [rbenv](https://github.com/rbenv/rbenv)).
``` \curl -sSL https://get.rvm.io | bash -s stable --ruby```

2. Add it to your .bashrc `echo '[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm"' >> ~/.bashrc`
3. Install Ruby and Use 2.2.0 `rvm install 2.2.0 && rvm use --default 2.2.0`
4. Install dependencies `bundle install`
5. Compile assets `gulp watch`
6. Start the server `rake up`
