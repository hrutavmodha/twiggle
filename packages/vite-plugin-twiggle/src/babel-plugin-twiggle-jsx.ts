import * as t from '@babel/types';
import { declare } from '@babel/helper-plugin-utils';

export default declare((api) => {
  api.assertVersion(7);

  return {
    name: 'twiggle-jsx-reactive-expressions',
    visitor: {
      CallExpression(path) {
        const callee = path.node.callee;

        let isJsxCall = false;
        // Case 1: Direct Identifier (e.g., jsxDEV(...))
        if (t.isIdentifier(callee) && (callee.name === 'jsxDEV' || callee.name === 'jsx')) {
          isJsxCall = true;
        }
        // Case 2: Member Expression (e.g., _jsx_dev_runtime.jsxDEV(...))
        else if (t.isMemberExpression(callee) && t.isIdentifier(callee.property) && (callee.property.name === 'jsxDEV' || callee.property.name === 'jsx')) {
          isJsxCall = true;
        }

        if (isJsxCall) {
          // The props object is the second argument to jsxDEV/jsx
          const props = path.node.arguments[1];

          if (t.isObjectExpression(props)) {
            props.properties.forEach((prop) => {
              if (t.isObjectProperty(prop)) {
                let value = prop.value;

                // If the value is a CallExpression (e.g., state.get())
                if (t.isCallExpression(value)) {
                  const callExpr = value;

                  // Check if it's a MemberExpression (e.g., state.get)
                  if (t.isMemberExpression(callExpr.callee)) {
                    const memberExpr = callExpr.callee;

                    // Check if the property is an Identifier named 'get'
                    if (t.isIdentifier(memberExpr.property) && memberExpr.property.name === 'get') {
                      // Wrap it in an arrow function: () => state.get()
                      prop.value = t.arrowFunctionExpression([], callExpr);
                    }
                  }
                }
              }
            });
          }
        }
      },
    },
  };
});