var e=`<img src="https://github.com/jakobrosenberg/consolite/raw/main/./consolite.svg" style="width:100%">

<h2 id="features">Features</h2>
<ul>
<li><strong>It&#39;s tiny</strong> - 371 bytes gzip + minify.</li>
<li><strong>It preserves line numbers</strong> - so you can find exactly where your code was logged.</li>
<li><strong>Prefixing</strong> - provide context for your logs by adding a prefix.</li>
<li><strong>Nesting</strong> - sometimes you need to add extra context. This can be handled by creating a child logger</li>
<li><strong>Log levels</strong> - log levels can be customized and are inherited by child instances</li>
<li><strong>Native console methods</strong> - consolite wraps around <code>console</code> so any method available on console will be available on consolite.</li>
</ul>
<h2 id="install">Install</h2>
<pre><code>npm install consolite
</code></pre>
<h2 id="basic-usage">Basic Usage</h2>
<pre><code class="language-javascript">import { createLogger } from &#39;consolite&#39;

const log = createLog()

log.log(&#39;hello world&#39;) // prints &quot;hello world&quot;
</code></pre>
<h2 id="examples">Examples</h2>
<h3 id="using-prefix">Using prefix</h3>
<pre><code class="language-javascript">const log = createLog(&#39;[my-prefix]&#39;)

log.log(&#39;hello world&#39;) // prints &quot;[my-prefix] hello world&quot;
</code></pre>
<h3 id="using-a-function-prefix">Using a function prefix</h3>
<pre><code class="language-javascript">const log = createLog(method =&gt; \`\${method} -&gt;\`)
log.debug(&#39;hello world&#39;) // prints &quot;debug -&gt; hello world&quot;
</code></pre>
<h3 id="child-logger">Child logger</h3>
<p>Child loggers inherit prefixes, levels and level from their parents.</p>
<pre><code class="language-javascript">const log = createLog(&#39;[parent]&#39;)
const childLog = log.createChild(&#39;[child]&#39;)

log.log(&#39;hello world&#39;) // prints &quot;[parent] [child] hello world&quot;
</code></pre>
<h3 id="changing-log-level">Changing log level</h3>
<pre><code class="language-javascript">const log = createLog()

log.debug(&#39;hello world&#39;) // does nothing
log.level = 4 // 3 by default
log.debug(&#39;hello world&#39;) // prints &quot;hello world&quot;
</code></pre>
<h3 id="changing-default-levels">Changing default levels</h3>
<pre><code class="language-javascript">const log = createLog()

log.debug(&#39;hello world&#39;) // does nothing
log.levels.debug = 3 // set debug to match current logging level
log.debug(&#39;hello world&#39;) // prints &quot;hello world&quot;
</code></pre>
<h3 id="adding-custom-method">Adding custom method</h3>
<pre><code class="language-javascript">const log = createLog()
log.register(&#39;silly&#39;, console.log)
log.levels.silly = 8
log.silly(&#39;hello world&#39;)
</code></pre>
`;export{e as default};
