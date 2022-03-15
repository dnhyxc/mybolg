### 去除 viewer

layout 最后一个 div 之上（`</body>`之上的`</div>`之前插入的<%- partial('\_partial/viewer') %>）去除 viewer(<%- partial('\_partial/viewer') %>)

### cover

```html
<cover class="cover">
  <div class="loading">
    <span class="btnBorder"></span>
    <span class="btnBorder"></span>
    <span class="btnBorder"></span>
    <span class="btnBorder"></span>
    LOADING
  </div>
  <div class="hideCoverBtn">CLOSE LOADING</div>
</cover>
```
