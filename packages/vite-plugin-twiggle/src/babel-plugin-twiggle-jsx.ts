import * as t from '@babel/types';
import { declare } from '@babel/helper-plugin-utils';

function isStateGetCall(node: any) {
  if (!t.isCallExpression(node)) {
    return false;
  }
  const callee = node.callee;
  return t.isMemberExpression(callee) && t.isIdentifier(callee.property) && callee.property.name === 'get';
}
const twiggleJsx = declare((api) => {
  api.assertVersion(7);

  return {
    name: 'twiggle-jsx-reactive-expressions',
    visitor: {
      CallExpression(path) {
        const callee = path.node.callee;
        let isJsxCall = false;
        if (t.isIdentifier(callee) && (callee.name === 'jsxDEV' || callee.name === 'jsx')) {
          isJsxCall = true;
        } else if (t.isMemberExpression(callee) && t.isIdentifier(callee.property) && (callee.property.name === 'jsxDEV' || callee.property.name === 'jsx')) {
          isJsxCall = true;
        }

        if (!isJsxCall) {
          return
        };
        const props = path.node.arguments[1];
        if (t.isObjectExpression(props)) {
          props.properties.forEach((prop) => {
            if (!t.isObjectProperty(prop)) return;
            if (t.isIdentifier(prop.key) && prop.key.name === 'children') {
              const children = prop.value;
              if (isStateGetCall(children)) {
                prop.value = t.arrowFunctionExpression([], children as any);
              }
              else if (t.isArrayExpression(children)) {
                children.elements.forEach((child, index) => {
                  if (isStateGetCall(child)) {
                    children.elements[index] = t.arrowFunctionExpression([], child as any);
                  }
                });
              }
            }
            else if (isStateGetCall(prop.value)) {
              prop.value = t.arrowFunctionExpression([], prop.value as any);
            }
          });
        }
      },
    },
  };
});

export default twiggleJsx