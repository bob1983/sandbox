# How to run

```
bundle install
bin/fluentd -c conf/fluent.conf &

# Sample
echo '{"json":"message"}' | bin/fluent-cat debug.test
```
