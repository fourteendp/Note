---
title: JavaScript - 一维数组转通讯录树
uid: 20240123112807176
aliases:
  - null
categories: []
tags:
  - 计算机/前端/数组
  - 通讯录
  - 转换
archive: false
draft: false
todo: false
createTime: 2023-05-07 22:01:31
updateTime: 2024-09-12 08:13:23
---

```javascript
function pySegSort(arr, key) {
  if (arr.length == 0) return
  if (!String.prototype.localeCompare) return null
  let letters = '*ABCDEFGHJKLMNOPQRSTWXYZ'.split('')
  let zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('')
  let segs = [] // 存放数据
  let res = {}
  let curr = {} // 当前数据
  let re = /[^\u4e00-\u9fa5]/ //中文正则
  let pattern = new RegExp(
    "[`\\-~!@  ) //特殊符号

  letters.filter((items, i) => {
    curr = {
      initial: '', //字母
      child: [], //数据
    }
    arr.map((v, index) => {
      // 特殊字符
      if (pattern.test(v[key][0])) {
        if (items == '*') {
          curr.child.push(v)
        }
      }
      // 判断首个字是否是中文
      if (re.test(v[key][0])) {
        // 英文
        if (v[key][0].toUpperCase() == items) {
          curr.child.push(v)
        }
      } else {
        // 中文
        // [[ifdef]] MP
        if (
          (!zh[i - 1] || `${zh[i - 1]}`.localeCompare(v[key]) <= 0) &&
          v[key].localeCompare(`${zh[i]}`) == -1
        ) {
          curr.child.push(v)
        }
        // [[endif]]
        // [[ifdef]] APP-PLUS
        let py = pinyin(v[key], {
          style: 'FIRST_LETTER',
        })
        if (py[0][0].toUpperCase() == items) {
          curr.child.push(v)
        }
        // [[endif]]
      }
    })

    if (curr.child.length) {
      curr.initial = letters[i]
      segs.push(curr)
      curr.child.sort((a, b) => {
        let result
        // [[ifdef]] MP
        result = a[key].localeCompare(b[key])
        // [[endif]]
        // [[ifdef]] APP-PLUS
        result = pinyin(a[key], {
          style: 'FIRST_LETTER',
        })[0][0].localeCompare(
          pinyin(b[key], {
            style: 'FIRST_LETTER',
          })[0][0],
        )
        // [[endif]]
        return result
      })
    }
  })
  res.segs = Array.from(new Set(segs)) //去重
  return res
},
```
