/*global chrome*/

import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Col, Divider, Input, Layout, Row, Switch, Typography } from "antd";
import { isEqual } from "lodash";

function App() {
  const [storage, setStorage] = useState({});
  const initStorage = useRef({});

  useEffect(() => {
    chrome.storage.sync.get("facebookLite", (data) => {
      initStorage.current = data?.facebookLite || {};
      setStorage(data?.facebookLite || {});
    });
    return () => {};
  }, []);

  const onChangeClearFB = (val) => {
    const newStorage = { ...storage, clearFB: val };
    updateStorage(newStorage);
  };

  const onChangeRemoveAds = (val) => {
    const newStorage = { ...storage, removeAds: val };
    updateStorage(newStorage);
  };

  const updateStorage = (newStorage) => {
    setStorage(newStorage);
    chrome.storage.sync.set({ facebookLite: newStorage });
  };

  const onChangeRemoveSuggestionPosts = (val) => {
    const newStorage = { ...storage, removeSuggestionPosts: val };
    updateStorage(newStorage);
  };

  const onChangeSize = (e) => {
    const newStorage = { ...storage, postSize: e.target.value };
    updateStorage(newStorage);
  };

  const onChangePostKeywords = (e) => {
    const newStorage = { ...storage, postKeywords: e.target.value };
    updateStorage(newStorage);
  };

  const onClickLink = () => {
    window.open("https://github.com/minhchienwikipedia");
  };

  return (
    <div style={{ width: 350 }} className="App">
      <header className="App-header">
        <Layout>
          <Layout.Header style={{ color: "white", fontWeight: "bold" }}>
            Facebook Lite
          </Layout.Header>
          <Layout.Content
            style={{ flexDirection: "column", backgroundColor: "#1f1f1f" }}
          >
            <Divider style={{ margin: 0 }} />
            <Row style={{ padding: 12 }} align="middle" justify="space-between">
              <Col span={16}>
                <Typography.Text>Clear FB</Typography.Text>
              </Col>
              <Col span={4}>
                <Switch checked={storage.clearFB} onChange={onChangeClearFB} />
              </Col>
            </Row>
            <Row style={{ padding: 12 }} align="middle" justify="space-between">
              <Col span={16}>
                <Typography.Text>Remove Ads</Typography.Text>
              </Col>
              <Col span={4}>
                <Switch
                  checked={storage.removeAds}
                  onChange={onChangeRemoveAds}
                />
              </Col>
            </Row>
            <Row style={{ padding: 12 }} align="middle" justify="space-between">
              <Col span={16}>
                <Typography.Text>Remove Suggestion Posts</Typography.Text>
              </Col>
              <Col span={4}>
                <Switch
                  checked={storage.removeSuggestionPosts}
                  onChange={onChangeRemoveSuggestionPosts}
                />
              </Col>
            </Row>
            <Row style={{ padding: 12 }} align="middle" justify="space-between">
              <Col span={12}>
                <Typography.Text>Post width</Typography.Text>
              </Col>
              <Col span={12}>
                <Input value={storage.postSize} onChange={onChangeSize} />
              </Col>
            </Row>
            <Row style={{ padding: 12 }} align="middle" justify="space-between">
              <Col span={12}>
                <Typography.Text>Post keywords filter</Typography.Text>
              </Col>
              <Col span={12}>
                <Input
                  value={storage.postKeywords}
                  onChange={onChangePostKeywords}
                  placeholder="keyword1,keyword2,..."
                />
              </Col>
            </Row>
            {!isEqual(initStorage.current, storage) ? (
              <Row style={{ padding: 12 }} align="middle" justify="center">
                <Typography.Text style={{ fontSize: 12 }} type="danger">
                  Please refresh your Facebook Website after change to active it
                </Typography.Text>
              </Row>
            ) : null}
          </Layout.Content>
          <Layout.Footer
            style={{
              paddingTop: 24,
              paddingBottom: 24,
              fontSize: 12,
              width: 350,
            }}
          >
            <Typography.Text>
              {"©2021 "}
              <Typography.Link onClick={onClickLink}>
                minhchienwikipedia
              </Typography.Link>
            </Typography.Text>
          </Layout.Footer>
        </Layout>
      </header>
    </div>
  );
}

export default App;
