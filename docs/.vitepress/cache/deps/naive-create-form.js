import {
  AutoComplete_default,
  Button_default,
  CheckboxGroup_default,
  Checkbox_default,
  ColorPicker_default,
  DatePicker_default,
  Divider_default,
  Drawer_default,
  FormItem_default,
  Form_default,
  InputNumber_default,
  Input_default,
  Modal_default,
  NIcon,
  RadioGroup_default,
  Radio_default,
  Rate_default,
  Select_default,
  Slider_default,
  Space_default,
  Spin_default,
  Step_default,
  Steps_default,
  Switch_default,
  TimePicker_default,
  Tooltip_default,
  Upload_default,
  useMessage
} from "./chunk-KTTLNWAL.js";
import {
  Fragment,
  computed,
  createBaseVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  defineComponent,
  isVNode,
  mergeProps,
  openBlock,
  reactive,
  ref,
  renderSlot,
  watch,
  watchEffect
} from "./chunk-LZPJ5JBW.js";
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/naive-create-form@1.3.3_naive-ui@2.34.3/node_modules/naive-create-form/dist/_virtual/index.mjs
var s = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [r2, c] of e)
    o[r2] = c;
  return o;
};

// node_modules/.pnpm/naive-create-form@1.3.3_naive-ui@2.34.3/node_modules/naive-create-form/dist/icon/index.mjs
var n = {
  name: "QuestionCircle48Regular"
};
var l = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 48 48"
};
var r = createBaseVNode("g", { fill: "none" }, [
  createBaseVNode("path", {
    d: "M24 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4zm0 2.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5zm.25 25.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3zm0-19c3.365 0 6.25 2.882 6.25 6.249c.002 2.12-.769 3.47-2.678 5.528l-1.015 1.087c-1.023 1.139-1.428 1.861-1.466 2.715l-.003.162l-.006.128l-.018.124a1.25 1.25 0 0 1-2.476-.234c-.013-1.789.677-3.012 2.308-4.785l1.027-1.098c1.358-1.492 1.828-2.373 1.827-3.626c0-1.987-1.765-3.75-3.75-3.75c-1.92 0-3.636 1.654-3.744 3.559l-.012.319A1.25 1.25 0 0 1 18 19.25c0-3.365 2.886-6.25 6.25-6.25z",
    fill: "currentColor"
  })
], -1);
var s2 = [
  r
];
function i(a, _, m, p2, d, f) {
  return openBlock(), createElementBlock("svg", l, s2);
}
var x = s(n, [["render", i]]);

// node_modules/.pnpm/naive-create-form@1.3.3_naive-ui@2.34.3/node_modules/naive-create-form/dist/utils/index.mjs
function u(n2 = "POST", o, s3, t = {}) {
  return new Promise((a, p2) => {
    const e = new XMLHttpRequest();
    e.open(n2, o);
    for (const r2 in t)
      Object.prototype.hasOwnProperty.call(t, r2) && e.setRequestHeader(r2, t[r2]);
    e.responseType = "json", e.send(JSON.stringify(s3)), e.onreadystatechange = () => {
      e.readyState === XMLHttpRequest.DONE && e.status === 200 && a(e.response);
    }, e.onerror = () => {
      p2(new Error("** An error occurred during the transaction"));
    };
  });
}

// node_modules/.pnpm/naive-create-form@1.3.3_naive-ui@2.34.3/node_modules/naive-create-form/dist/components/proForm/index.mjs
function p(l2) {
  return typeof l2 == "function" || Object.prototype.toString.call(l2) === "[object Object]" && !isVNode(l2);
}
var ze = {
  autoPlaceholder: Boolean,
  autoMessageError: Boolean,
  modal: Boolean,
  modalShow: Boolean,
  modalProps: Object,
  drawer: Boolean,
  drawerShow: Boolean,
  drawerProps: Object,
  formProps: Object,
  formItems: {
    type: Array,
    default: []
  },
  stepsFormItems: {
    type: Array,
    default: []
  },
  resetButton: Boolean,
  validateButton: Boolean,
  submitButton: {
    type: Boolean,
    default: true
  },
  steps: Boolean,
  spin: Boolean,
  scrollToFirstError: Boolean,
  title: String,
  isKeyPressSubmit: Boolean,
  initialValues: Object,
  modelValue: Object,
  requestConfig: Object,
  transform: Function,
  onReset: Function,
  onFinish: Function,
  onError: Function,
  onValidate: Function,
  onUpdateModalShow: Function,
  "onUpdate:modalShow": Function,
  "onUpdate:modelValue": Function,
  onUpdateModelValue: Function,
  onUpdateDrawerShow: Function,
  "onUpdate:drawerShow": Function,
  onValuesChange: Function
};
var Te = defineComponent({
  name: "ProForm",
  props: ze,
  setup(l2, {
    slots: R,
    expose: b
  }) {
    const t = reactive({}), h = ref(1), S = ref("process"), y = ref(false), s3 = ref({}), f = () => {
      for (const e in l2.initialValues)
        Object.prototype.hasOwnProperty.call(l2.initialValues, e) && (t[e] = l2.initialValues[e]);
    };
    watchEffect(() => {
      if (l2.modelValue !== void 0)
        for (const e in l2.modelValue)
          Object.prototype.hasOwnProperty.call(l2.modelValue, e) && (t[e] = l2.modelValue[e]);
    }), watch(t, () => {
      l2.onUpdateModelValue && l2.onUpdateModelValue(t), l2["onUpdate:modelValue"] && l2["onUpdate:modelValue"](t);
    }), f();
    const w = ref(null), k = (e) => {
      const r2 = document.querySelector(e), u2 = (r2 == null ? void 0 : r2.getClientRects()[0].top) || 0;
      window.scrollBy({
        top: u2 - 50,
        behavior: "smooth"
      });
    };
    let C;
    l2.autoMessageError && (C = useMessage());
    const E = (e) => {
      C && C.error(e || "");
    }, U = () => {
      var a;
      const {
        scrollToFirstError: e,
        autoMessageError: r2,
        onValidate: u2,
        onError: n2
      } = l2;
      (a = w.value) == null || a.validate((c) => {
        c ? (e && c.length > 0 && k(`#n-pro-form-${c[0][0].field}`), r2 && c.length > 0 && E(c[0][0].message), n2 && n2(c)) : u2 && u2(t);
      });
    }, N = () => {
      for (const e in t)
        Object.prototype.hasOwnProperty.call(t, e) && (l2.initialValues ? t[e] = l2.initialValues[e] : t[e] = null);
      l2 != null && l2.onReset && l2.onReset();
    }, g = () => {
      var q;
      y.value = true;
      const {
        onFinish: e,
        onError: r2,
        transform: u2,
        steps: n2,
        stepsFormItems: a,
        scrollToFirstError: c,
        autoMessageError: B
      } = l2;
      (q = w.value) == null || q.validate(async (V) => {
        if (V)
          n2 && (S.value = "error"), c && V.length > 0 && k(`#n-pro-form-${V[0][0].field}`), B && V.length > 0 && E(V[0][0].message), r2 && r2(V), y.value = false;
        else {
          if (n2) {
            S.value = "process";
            const ee = a.length;
            h.value < ee && h.value++;
            return;
          }
          const z = l2.requestConfig;
          let x2;
          const $ = u2 ? u2(t) : t;
          z === void 0 ? x2 = $ : x2 = await u(z.methods, z.url, $, z.headers), e && await e(x2), y.value = false;
        }
      });
    };
    b({
      submit: g,
      reset: N,
      validate: U,
      scrollToField: k
    });
    const i2 = (e, r2, u2) => {
      t[r2] = u2 ? u2(e) : e, l2 != null && l2.onValuesChange && l2.onValuesChange(r2, e);
      const n2 = s3.value[r2];
      n2 !== void 0 && n2.forEach((a) => {
        a(r2, e);
      });
    }, P = (e, r2, u2) => {
      e ? t[r2] = u2 : t[r2] = null, l2 != null && l2.onValuesChange && l2.onValuesChange(r2, e);
    }, T = (e) => {
      l2.onUpdateModalShow && l2.onUpdateModalShow(e), l2["onUpdate:modalShow"] && l2["onUpdate:modalShow"](e);
    }, v = (e) => {
      l2.onUpdateDrawerShow && l2.onUpdateDrawerShow(e), l2["onUpdate:drawerShow"] && l2["onUpdate:drawerShow"](e);
    }, D = (e) => {
      e.key === "Enter" && g();
    };
    watchEffect(() => {
      l2.isKeyPressSubmit ? window.addEventListener("keydown", D) : window.removeEventListener("keydown", D);
    });
    const Q = (e) => {
      var r2;
      if (!(e.type === "divider" || e.type === "slot"))
        return (r2 = e.tooltipConfig) != null && r2.show ? createVNode(Tooltip_default, {
          trigger: "hover"
        }, {
          trigger: () => createVNode(NIcon, {
            size: 20
          }, {
            default: () => [createVNode(x, null, null)]
          }),
          default: () => {
            var u2;
            return (u2 = e.tooltipConfig) == null ? void 0 : u2.text;
          }
        }) : null;
    }, J = (e) => {
      var r2, u2;
      switch (e.type) {
        case "input":
          return createVNode(Input_default, mergeProps(e.props, {
            value: t[e.key],
            onUpdateValue: (n2) => {
              i2(n2, e.key, e.normalize);
            }
          }), null);
        case "inputNumber":
          return createVNode(InputNumber_default, mergeProps(e.props, {
            value: t[e.key],
            onUpdateValue: (n2) => {
              i2(n2, e.key, e.normalize);
            }
          }), null);
        case "radio":
          if (e.valueEnum) {
            let n2;
            return e.valueEnum.length > 1 ? createVNode(RadioGroup_default, mergeProps(e.props, {
              value: t[e.key],
              onUpdateValue: (a) => {
                i2(a, e.key, e.normalize);
              }
            }), p(n2 = e.valueEnum.map((a) => createVNode(Radio_default, mergeProps(a, {
              key: a.value
            }), null))) ? n2 : {
              default: () => [n2]
            }) : e.valueEnum.map((a) => createVNode(Radio_default, mergeProps(e.props, a, {
              key: a.value,
              checked: a.value === t[e.key],
              onUpdateChecked: (c) => {
                P(c, e.key, a.value);
              }
            }), null));
          } else
            return [];
        case "select":
          return createVNode(Select_default, mergeProps(e.props, {
            options: e.valueEnum,
            value: t[e.key],
            onUpdateValue: (n2) => {
              i2(n2, e.key, e.normalize);
            }
          }), null);
        case "rate":
          return createVNode(Rate_default, mergeProps(e.props, {
            value: t[e.key],
            onUpdateValue: (n2) => {
              i2(n2, e.key, e.normalize);
            }
          }), null);
        case "switch":
          return createVNode(Switch_default, mergeProps(e.props, {
            value: t[e.key],
            onUpdateValue: (n2) => {
              i2(n2, e.key, e.normalize);
            }
          }), null);
        case "timePicker":
          return createVNode(TimePicker_default, mergeProps(e.props, {
            value: t[e.key],
            onUpdateValue: (n2) => {
              i2(n2, e.key, e.normalize);
            }
          }), null);
        case "datePicker":
          return createVNode(DatePicker_default, mergeProps(e.props, {
            onUpdateValue: (n2) => {
              i2(n2, e.key, e.normalize);
            },
            value: t[e.key]
          }), null);
        case "colorPicker":
          return createVNode(ColorPicker_default, mergeProps(e.props, {
            onUpdateValue: (n2) => {
              i2(n2, e.key, e.normalize);
            },
            value: t[e.key]
          }), null);
        case "checkbox":
          if (e.valueEnum) {
            let n2;
            return e.valueEnum.length > 1 ? createVNode(CheckboxGroup_default, mergeProps(e.props, {
              onUpdateValue: (a) => {
                i2(a, e.key, e.normalize);
              },
              value: t[e.key]
            }), p(n2 = e.valueEnum.map((a) => createVNode(Checkbox_default, mergeProps({
              key: a.value
            }, a), null))) ? n2 : {
              default: () => [n2]
            }) : e.valueEnum.map((a) => createVNode(Checkbox_default, mergeProps(e.props, {
              key: a.value
            }, a, {
              onUpdateChecked: (c) => {
                i2(c, e.key, e.normalize);
              },
              value: t[e.key]
            }), null));
          } else
            return [];
        case "upload":
          return createVNode(Upload_default, mergeProps(e.props, {
            fileList: (r2 = t[e.key]) != null ? r2 : [],
            onUpdateFileList: (n2) => {
              i2(n2, e.key, e.normalize);
            }
          }), {
            default: () => [createVNode(Button_default, null, {
              default: () => [e.buttonText]
            })]
          });
        case "slider":
          return createVNode(Slider_default, {
            onUpdateValue: (n2) => {
              i2(n2, e.key, e.normalize);
            },
            value: t[e.key]
          }, null);
        case "autoComplete":
          return createVNode(AutoComplete_default, mergeProps(e.props, {
            value: t[e.key],
            onUpdateValue: (n2) => {
              i2(n2, e.key, e.normalize);
            },
            options: (u2 = e.valueEnum) == null ? void 0 : u2.map((n2) => {
              const a = t[e.key].value.split(e.splitString)[0];
              return {
                label: a + n2,
                value: a + n2
              };
            })
          }), null);
        default:
          return;
      }
    }, I = (e) => {
      const {
        autoPlaceholder: r2,
        scrollToFirstError: u2
      } = l2;
      return e == null ? void 0 : e.map((n2) => {
        if (n2.type === "divider")
          return createVNode(Divider_default, {
            dashed: n2.dashed,
            titlePlacement: n2.titlePlacement,
            vertical: n2.vertical,
            key: n2.text
          }, {
            default: () => [n2.text]
          });
        if (n2.type === "slot")
          return renderSlot(R, n2.key);
        if (r2) {
          let a;
          (n2.type === "input" || n2.type === "inputNumber" || n2.type === "autoComplete") && (a = `请输入${n2.label}`, n2.props ? n2.props.placeholder = a : n2.props = {
            placeholder: a
          }), (n2.type === "select" || n2.type === "timePicker" || n2.type === "datePicker") && (a = `请选择${n2.label}`, n2.props ? n2.props.placeholder = a : n2.props = {
            placeholder: a
          });
        }
        if (n2.dependencies !== void 0 && n2.dependenciesChange !== void 0) {
          const a = n2.dependenciesChange;
          if (typeof n2.dependencies == "string") {
            const c = s3.value[n2.dependencies];
            c !== void 0 ? c.add(a) : s3.value[n2.dependencies] = /* @__PURE__ */ new Set([a]);
          } else
            n2.dependencies.forEach((c) => {
              const B = s3.value[c];
              B !== void 0 ? B.add(a) : s3.value[c] = /* @__PURE__ */ new Set([a]);
            });
        }
        return createVNode(FormItem_default, mergeProps(n2.formItemProps, {
          key: n2.key,
          label: n2.label,
          path: n2.key,
          rule: n2.rule
        }), {
          default: () => [u2 ? createVNode("div", {
            id: `n-pro-form-${n2.key}`
          }, null) : null, J(n2), Q(n2)]
        });
      });
    }, W = computed(() => {
      const {
        formItems: e,
        steps: r2,
        stepsFormItems: u2
      } = l2;
      return I(r2 ? u2[h.value - 1].formItems : e);
    }), X = computed(() => {
      const {
        stepsFormItems: e
      } = l2;
      return e.map((r2) => createVNode(Step_default, {
        key: r2.key,
        title: r2.title
      }, null));
    }), Y = computed(() => {
      const {
        steps: e,
        stepsFormItems: r2
      } = l2;
      if (e) {
        const u2 = r2.length;
        return h.value < u2 ? "下一步" : "提交";
      } else
        return "提交";
    }), Z = computed(() => {
      const {
        resetButton: e,
        validateButton: r2,
        submitButton: u2
      } = l2;
      return createVNode(Space_default, {
        justify: "center"
      }, {
        default: () => [r2 === true ? createVNode(Button_default, {
          onClick: U,
          type: "warning"
        }, {
          default: () => [createTextVNode("验证")]
        }) : null, e === true ? createVNode(Button_default, {
          onClick: N,
          type: "error"
        }, {
          default: () => [createTextVNode("重置")]
        }) : null, u2 === true ? createVNode(Button_default, {
          onClick: g,
          type: "primary"
        }, {
          default: () => [Y.value]
        }) : null]
      });
    });
    return {
      modalData: t,
      stepsCurrent: h,
      stepsStatus: S,
      spinStatus: y,
      formRef: w,
      handleValidateClick: U,
      handleInputUpdateValue: i2,
      handleRadioUpdateChecked: P,
      handleResetClick: N,
      handleSubmitClick: g,
      handleModalShowChange: T,
      handleDrawerShowChange: v,
      Vnode: W,
      BtnsVnode: Z,
      stepsVnode: X
    };
  },
  render() {
    const {
      steps: l2,
      spin: R,
      formProps: b,
      stepsCurrent: t,
      stepsStatus: h,
      spinStatus: S,
      modalData: y,
      title: s3,
      Vnode: f,
      BtnsVnode: w,
      stepsVnode: k,
      modal: C,
      modalShow: E,
      modalProps: U,
      drawer: N,
      drawerShow: g,
      drawerProps: i2,
      handleModalShowChange: P,
      handleDrawerShowChange: T
    } = this, v = R ? createVNode(Spin_default, {
      show: S
    }, {
      default: () => [createVNode(Form_default, mergeProps(b, {
        model: y,
        ref: "formRef"
      }), p(f) ? f : {
        default: () => [f]
      }), w]
    }) : createVNode(Fragment, null, [createVNode(Form_default, mergeProps(b, {
      model: y,
      ref: "formRef"
    }), p(f) ? f : {
      default: () => [f]
    }), w]);
    return l2 ? createVNode(Space_default, {
      vertical: true,
      size: 50,
      align: "stretch"
    }, {
      default: () => [createVNode(Steps_default, {
        current: t,
        status: h
      }, p(k) ? k : {
        default: () => [k]
      }), v]
    }) : C ? createVNode(Modal_default, mergeProps({
      show: E,
      preset: "card",
      style: {
        width: "50%"
      }
    }, U, {
      onUpdateShow: P
    }), {
      default: () => [s3 ? createVNode(Divider_default, null, p(s3) ? s3 : {
        default: () => [s3]
      }) : null, v]
    }) : N ? createVNode(Drawer_default, mergeProps({
      show: g
    }, i2, {
      onUpdateShow: T
    }), {
      default: () => [s3 ? createVNode(Divider_default, null, p(s3) ? s3 : {
        default: () => [s3]
      }) : null, v]
    }) : createVNode(Fragment, null, [s3 ? createVNode(Divider_default, null, p(s3) ? s3 : {
      default: () => [s3]
    }) : null, v]);
  }
});
export {
  Te as ProForm
};
//# sourceMappingURL=naive-create-form.js.map
