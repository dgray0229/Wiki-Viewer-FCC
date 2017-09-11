"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// React Components
var _React = React;
var Component = _React.Component;
var Children = _React.Children;
var PropTypes = _React.PropTypes;

var Application = function (_Component) {
  _inherits(Application, _Component);

  function Application() {
    _classCallCheck(this, Application);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Application.prototype.render = function render() {
    return React.createElement(
      "main",
      { className: "wiki-calculator" },
      React.createElement(Header, null),
      React.createElement(Button, null),
      React.createElement(Search, null)
    );
  };

  return Application;
}(Component);

Application.defaultProps = {
  isSearching: false
};

var Header = function (_Component2) {
  _inherits(Header, _Component2);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _Component2.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "hero-section" },
      React.createElement(
        "div",
        { className: "hero-section-text" },
        React.createElement(
          "h1",
          null,
          "Wiki Viewer"
        ),
        React.createElement(
          "h5",
          null,
          "A Project from Free Code Camp"
        ),
        React.createElement(
          "p",
          null,
          "By",
          " ",
          React.createElement(
            "a",
            { href: "https://devingrayllc.com", target: "_blank" },
            "Devin Gray LLC"
          )
        )
      )
    );
  };

  return Header;
}(Component);

var Button = function (_Component3) {
  _inherits(Button, _Component3);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _Component3.apply(this, arguments));
  }

  Button.prototype.render = function render() {
    return React.createElement(
      "a",
      {
        className: "button button-rounded-hover right",
        href: "https://en.wikipedia.org/wiki/Special:Random",
        target: "_blank"
      },
      "Lookup Random Article"
    );
  };

  return Button;
}(Component);

var Search = function (_Component4) {
  _inherits(Search, _Component4);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this4 = _possibleConstructorReturn(this, _Component4.call(this, props));

    _this4.changeSearching = _this4.changeSearching.bind(_this4);
    _this4.updateQuery = _this4.updateQuery.bind(_this4);
    _this4.state = {
      query: null,
      searching: false
    };
    return _this4;
  }

  Search.prototype.changeSearching = function changeSearching(bool) {
    this.setState({ searching: bool });
  };

  Search.prototype.updateQuery = function updateQuery(query) {
    this.setState({ query: query });
  };

  Search.prototype.render = function render() {
    return React.createElement(
      "div",
      { id: "search-container" },
      React.createElement(SearchBar, {
        changeSearching: this.changeSearching,
        updateQuery: this.updateQuery
      }),
      this.state.searching && React.createElement(PanelResults, {
        searching: this.state.searching,
        query: this.state.query
      })
    );
  };

  return Search;
}(Component);

var SearchBar = function (_Component5) {
  _inherits(SearchBar, _Component5);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this5 = _possibleConstructorReturn(this, _Component5.call(this, props));

    _this5.handleChange = _this5.handleChange.bind(_this5);
    _this5.state = { value: "" };
    return _this5;
  }

  SearchBar.prototype.handleChange = function handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.changeSearching(true);
    this.props.updateQuery(event.target.value);
  };

  SearchBar.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "input-group input-group-rounded" },
      React.createElement("input", {
        id: "search-term",
        className: "input-group-field",
        type: "search",
        value: this.state.value,
        onChange: this.handleChange
      }),
      React.createElement(
        "div",
        { className: "input-group-button" },
        React.createElement("input", {
          id: "search-button",
          type: "submit",
          className: "button secondary",
          value: "Search",
          onClick: this.handleChange
        })
      )
    );
  };

  return SearchBar;
}(Component);

var PanelResults = function (_Component6) {
  _inherits(PanelResults, _Component6);

  function PanelResults(props) {
    _classCallCheck(this, PanelResults);

    var _this6 = _possibleConstructorReturn(this, _Component6.call(this, props));

    _this6.handleSearch = _this6.handleSearch.bind(_this6);
    _this6.onSuccess = _this6.onSuccess.bind(_this6);
    _this6.onError = _this6.onError.bind(_this6);

    _this6.state = {
      data: null,
      query: ""
    };
    return _this6;
  }

  PanelResults.prototype.componentDidMount = function componentDidMount() {
    if (this.props.query) {
      this.handleSearch(this.props.query);
    }
  };

  PanelResults.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.handleSearch(this.props.query);
    }
  };

  PanelResults.prototype.handleSearch = function handleSearch(query) {
    var _this7 = this;

    var searchTerm = query,
        url = ["https://en.wikipedia.org/w/api.php", "?action=opensearch&search=", searchTerm, "&format=json&callback=?"].join("");
    setTimeout(function () {
      $.ajax({
        type: "GET",
        url: url,
        async: true,
        dataType: "json",
        success: _this7.onSuccess,
        error: _this7.onError
      });
    }, 500);
  };

  PanelResults.prototype.onSuccess = function onSuccess(data) {
    this.setState({
      data: data,
      query: this.props.query
    });
  };

  PanelResults.prototype.onError = function onError(err) {
    alert("Error:" + err);
  };

  PanelResults.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "posts-panel center" },
      React.createElement(PanelHeader, { title: this.props.query }),
      React.createElement(PanelContent, { data: this.state.data })
    );
  };

  return PanelResults;
}(Component);

var PanelHeader = function (_Component7) {
  _inherits(PanelHeader, _Component7);

  function PanelHeader() {
    _classCallCheck(this, PanelHeader);

    return _possibleConstructorReturn(this, _Component7.apply(this, arguments));
  }

  PanelHeader.prototype.render = function render() {
    return React.createElement(
      "header",
      { className: "panel-header" },
      React.createElement(
        "h1",
        { className: "panel-title" },
        this.props.title
      )
    );
  };

  return PanelHeader;
}(Component);

var PanelContent = function (_Component8) {
  _inherits(PanelContent, _Component8);

  function PanelContent(props) {
    _classCallCheck(this, PanelContent);

    var _this9 = _possibleConstructorReturn(this, _Component8.call(this, props));

    _this9.handlePosts = _this9.handlePosts.bind(_this9);
    _this9.state = {
      posts: []
    };
    return _this9;
  }

  PanelContent.prototype.componentDidMount = function componentDidMount() {
    if (this.props.data) {
      this.handlePosts(this.props.data);
    }
  };

  PanelContent.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props;
  };

  PanelContent.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (this.props.data && this.props.data !== nextProps.data) {
      this.handlePosts(nextProps.data);
      console.log("nextProps:", nextProps, "this.props:", this.props, "nextState:", nextState, "this.state:", this.state);
    }
  };

  PanelContent.prototype.handlePosts = function handlePosts(data) {
    if (data) {
      var title = [].concat(data[1]),
          description = [].concat(data[2]),
          link = [].concat(data[3]),
          count = title.length,
          posts = this.state.posts;
      // Loop
      for (var i = 0; i < count; i++) {
        var key = i.toString(),
            post = React.createElement(
          "div",
          { key: key, className: "panel-content" },
          React.createElement(
            "section",
            { className: "pinned-post" },
            React.createElement(
              "div",
              { className: "post-item" },
              React.createElement(
                "div",
                { className: "post-text" },
                React.createElement(
                  "a",
                  { key: key, href: link[i], target: "_blank" },
                  React.createElement(
                    "h3",
                    { key: key, className: "post-title" },
                    title[i]
                  )
                ),
                React.createElement(
                  "div",
                  { className: "post-summary" },
                  React.createElement(
                    "p",
                    { key: key },
                    description[i],
                    React.createElement(
                      "a",
                      {
                        href: link[i],
                        target: "_blank",
                        className: "post-read-more"
                      },
                      "Read more",
                      React.createElement("span", {
                        className: "fa fa-chevron-circle-right",
                        "aria-hidden": "true"
                      })
                    )
                  )
                )
              )
            )
          )
        );
        if (posts[i] !== post) {
          posts.splice(i, posts.length);
          posts.push(post);
        }
      } // End For Loop
      this.setState({ posts: posts });
    }
  };

  PanelContent.prototype.render = function render() {
    var postList = this.state.posts;
    return React.createElement(
      "div",
      null,
      postList
    );
  };

  return PanelContent;
}(Component);

// Render the above component into the div#react

ReactDOM.render(React.createElement(Application, null), document.querySelector("body"));