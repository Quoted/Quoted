describe('App', function() {
  it('should be a great app', function() {
    expect(true).to.be.true;
  });
  it('should make it so you do not need to talk to people', function() {
    expect(true===false).to.be.false;
  });
});

describe('Business List Item', function() {
  var {
    renderIntoDocument,
    findRenderedDOMComponentWithClass
  } = React.addons.TestUtils;

  var fakeBiz; 

  // In order to leverage React's test utility function `findRenderedDOMComponentWithClass`
  // for stateless functional components, we must wrap them in a class component
  // Wrapper.jsx defined a Wrapper component to use in our tests.
  // Read more here: https://github.com/facebook/react/issues/4972

  // class Wrapper extends React.Component {
  //   render() {
  //     return (
  //       <div>{this.props.children}</div>
  //     );
  //   }
  // }

  // window.Wrapper = Wrapper;

  // beforeEach(function() {
  //   fakeBiz = renderIntoDocument(
  //     <Wrapper>
  //         <ListItem/>
  //     </Wrapper>
  //   );
  // });

  xit('List Item should be written as a stateful class component to be refactored later', function() {
    expect(React.Component.isPrototypeOf(ListItem)).to.be.true;
  });

});


xdescribe('Main Content', function() {

  it('MainContent should be a stateful class component', function() {
    expect(React.Component.isPrototypeOf(MainContent)).to.be.true;
  });

});
