export const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "title": "SafeLearn API",
    "version": "1.0.0",
    "description": "Comprehensive API documentation for SafeLearn backend."
  },
  "servers": [
    {
      "url": "http://localhost:3001",
      "description": "Local Development Server"
    }
  ],
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "paths": {
    "/api/auth/register": {
      "post": {
        "summary": "Register",
        "tags": [
          "Auth"
        ],
        "responses": {
          "201": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "User registered successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 5
                        },
                        "name": {
                          "type": "string",
                          "example": "New User"
                        },
                        "username": {
                          "type": "string",
                          "example": "newuser1786551226617"
                        },
                        "email": {
                          "type": "string",
                          "example": "new1786551226617@test.com"
                        },
                        "role": {
                          "type": "string",
                          "example": "student"
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:47.037Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:47.037Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "New User"
                  },
                  "username": {
                    "type": "string",
                    "example": "newuser1786551226617"
                  },
                  "email": {
                    "type": "string",
                    "example": "new1786551226617@test.com"
                  },
                  "password": {
                    "type": "string",
                    "example": "Password_123"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/me": {
      "get": {
        "summary": "Get Current User (Me)",
        "tags": [
          "Auth"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 1
                        },
                        "name": {
                          "type": "string",
                          "example": "Jimly"
                        },
                        "username": {
                          "type": "string",
                          "example": "jimly"
                        },
                        "email": {
                          "type": "string",
                          "example": "jimly@gmail.com"
                        },
                        "role": {
                          "type": "string",
                          "example": "student"
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-11T14:41:19.033Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-11T14:41:19.033Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      }
    },
    "/api/courses": {
      "get": {
        "summary": "Get All Courses",
        "tags": [
          "Courses"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Courses retrieved successfully"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number",
                            "example": 4
                          },
                          "title": {
                            "type": "string",
                            "example": "Html Css Javascript professional"
                          },
                          "slug": {
                            "type": "string",
                            "example": "html-css-javascript-professional"
                          },
                          "description": {
                            "type": "string",
                            "example": "alakae belajar html css javasckript dasar"
                          },
                          "thumbnail": {
                            "type": "string",
                            "example": "https://localhost:3001/dataaa"
                          },
                          "level": {
                            "type": "string",
                            "example": "BEGINNER"
                          },
                          "status": {
                            "type": "string",
                            "example": "PUBLISHED"
                          },
                          "createdAt": {
                            "type": "string",
                            "example": "2026-08-11T19:20:06.785Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "example": "2026-08-11T19:20:36.081Z"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create Course (Admin)",
        "tags": [
          "Courses"
        ],
        "responses": {
          "400": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": false
                    },
                    "message": {
                      "type": "string",
                      "example": "Validation failed"
                    },
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "field": {
                            "type": "string",
                            "example": "description"
                          },
                          "message": {
                            "type": "string",
                            "example": "Description must be at least 10 characters"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "example": "New Course"
                  },
                  "slug": {
                    "type": "string",
                    "example": "new-course-1786551227311"
                  },
                  "description": {
                    "type": "string",
                    "example": "desc"
                  },
                  "level": {
                    "type": "string",
                    "example": "BEGINNER"
                  },
                  "status": {
                    "type": "string",
                    "example": "DRAFT"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/courses/{id}": {
      "get": {
        "summary": "Get Course By ID",
        "tags": [
          "Courses"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Course retrieved successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 2
                        },
                        "title": {
                          "type": "string",
                          "example": "Belajar hahahaha"
                        },
                        "slug": {
                          "type": "string",
                          "example": "belajar-pemrograman-web"
                        },
                        "description": {
                          "type": "string",
                          "example": "Belajar pemrograman web modern menggunakan HTML, CSS, JavaScript, dan framework."
                        },
                        "thumbnail": {
                          "type": "string",
                          "example": "https://example.com/images/web-programming.jpg"
                        },
                        "level": {
                          "type": "string",
                          "example": "INTERMEDIATE"
                        },
                        "status": {
                          "type": "string",
                          "example": "PUBLISHED"
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-11T17:26:58.695Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-11T17:34:37.100Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "put": {
        "summary": "Update Course (Admin)",
        "tags": [
          "Courses"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Course updated successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 2
                        },
                        "title": {
                          "type": "string",
                          "example": "Updated Course Title"
                        },
                        "slug": {
                          "type": "string",
                          "example": "belajar-pemrograman-web"
                        },
                        "description": {
                          "type": "string",
                          "example": "Belajar pemrograman web modern menggunakan HTML, CSS, JavaScript, dan framework."
                        },
                        "thumbnail": {
                          "type": "string",
                          "example": "https://example.com/images/web-programming.jpg"
                        },
                        "level": {
                          "type": "string",
                          "example": "INTERMEDIATE"
                        },
                        "status": {
                          "type": "string",
                          "example": "PUBLISHED"
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-11T17:26:58.695Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:47.456Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "example": "Updated Course Title"
                  }
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete Course (Admin)",
        "tags": [
          "Courses"
        ],
        "responses": {
          "404": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": false
                    },
                    "message": {
                      "type": "string",
                      "example": "Course not found"
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/api/courses/slug/{slug}": {
      "get": {
        "summary": "Get Course By Slug",
        "tags": [
          "Courses"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Course retrieved successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 2
                        },
                        "title": {
                          "type": "string",
                          "example": "Belajar hahahaha"
                        },
                        "slug": {
                          "type": "string",
                          "example": "belajar-pemrograman-web"
                        },
                        "description": {
                          "type": "string",
                          "example": "Belajar pemrograman web modern menggunakan HTML, CSS, JavaScript, dan framework."
                        },
                        "thumbnail": {
                          "type": "string",
                          "example": "https://example.com/images/web-programming.jpg"
                        },
                        "level": {
                          "type": "string",
                          "example": "INTERMEDIATE"
                        },
                        "status": {
                          "type": "string",
                          "example": "PUBLISHED"
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-11T17:26:58.695Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-11T17:34:37.100Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [
          {
            "name": "slug",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ]
      }
    },
    "/api/modules": {
      "get": {
        "summary": "Get Modules",
        "tags": [
          "Modules"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Modules retrieved successfully"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number",
                            "example": 1
                          },
                          "courseId": {
                            "type": "number",
                            "example": 4
                          },
                          "title": {
                            "type": "string",
                            "example": "HTML Dasar dan Semantik HTML"
                          },
                          "description": {
                            "type": "string",
                            "example": "Mempelajari dasar HTML"
                          },
                          "order": {
                            "type": "number",
                            "example": 1
                          },
                          "createdAt": {
                            "type": "string",
                            "example": "2026-08-12T11:22:57.957Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "example": "2026-08-12T11:27:28.255Z"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create Module (Admin)",
        "tags": [
          "Modules"
        ],
        "responses": {
          "201": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Module created successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 5
                        },
                        "courseId": {
                          "type": "number",
                          "example": 2
                        },
                        "title": {
                          "type": "string",
                          "example": "New Module"
                        },
                        "description": {
                          "type": "object"
                        },
                        "order": {
                          "type": "number",
                          "example": 2
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:47.693Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:47.693Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "courseId": {
                    "type": "number",
                    "example": 2
                  },
                  "title": {
                    "type": "string",
                    "example": "New Module"
                  },
                  "order": {
                    "type": "number",
                    "example": 2
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/modules/{id}": {
      "get": {
        "summary": "Get Module By ID",
        "tags": [
          "Modules"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Module retrieved successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 4
                        },
                        "courseId": {
                          "type": "number",
                          "example": 2
                        },
                        "title": {
                          "type": "string",
                          "example": "Test Module"
                        },
                        "description": {
                          "type": "object"
                        },
                        "order": {
                          "type": "number",
                          "example": 1
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:46.545Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:46.545Z"
                        },
                        "lessons": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "number",
                                "example": 3
                              },
                              "moduleId": {
                                "type": "number",
                                "example": 4
                              },
                              "title": {
                                "type": "string",
                                "example": "Test Lesson"
                              },
                              "description": {
                                "type": "object"
                              },
                              "content": {
                                "type": "object"
                              },
                              "videoUrl": {
                                "type": "object"
                              },
                              "order": {
                                "type": "number",
                                "example": 1
                              },
                              "createdAt": {
                                "type": "string",
                                "example": "2026-08-12T16:13:46.566Z"
                              },
                              "updatedAt": {
                                "type": "string",
                                "example": "2026-08-12T16:13:46.566Z"
                              }
                            }
                          }
                        },
                        "quizzes": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "number",
                                "example": 3
                              },
                              "moduleId": {
                                "type": "number",
                                "example": 4
                              },
                              "title": {
                                "type": "string",
                                "example": "Test Quiz"
                              },
                              "description": {
                                "type": "object"
                              },
                              "createdAt": {
                                "type": "string",
                                "example": "2026-08-12T16:13:46.591Z"
                              },
                              "updatedAt": {
                                "type": "string",
                                "example": "2026-08-12T16:13:46.591Z"
                              }
                            }
                          }
                        },
                        "quests": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "number",
                                "example": 3
                              },
                              "moduleId": {
                                "type": "number",
                                "example": 4
                              },
                              "title": {
                                "type": "string",
                                "example": "Test Quest"
                              },
                              "description": {
                                "type": "object"
                              },
                              "createdAt": {
                                "type": "string",
                                "example": "2026-08-12T16:13:46.605Z"
                              },
                              "updatedAt": {
                                "type": "string",
                                "example": "2026-08-12T16:13:46.605Z"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "patch": {
        "summary": "Update Module (Admin)",
        "tags": [
          "Modules"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Module updated successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 4
                        },
                        "courseId": {
                          "type": "number",
                          "example": 2
                        },
                        "title": {
                          "type": "string",
                          "example": "Updated Module Title"
                        },
                        "description": {
                          "type": "object"
                        },
                        "order": {
                          "type": "number",
                          "example": 1
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:46.545Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:47.850Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "example": "Updated Module Title"
                  }
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete Module (Admin)",
        "tags": [
          "Modules"
        ],
        "responses": {
          "404": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": false
                    },
                    "message": {
                      "type": "string",
                      "example": "Module not found"
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/api/modules/course/{id}": {
      "get": {
        "summary": "Get Modules by Course",
        "tags": [
          "Modules"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Modules retrieved successfully"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number",
                            "example": 4
                          },
                          "courseId": {
                            "type": "number",
                            "example": 2
                          },
                          "title": {
                            "type": "string",
                            "example": "Test Module"
                          },
                          "description": {
                            "type": "object"
                          },
                          "order": {
                            "type": "number",
                            "example": 1
                          },
                          "createdAt": {
                            "type": "string",
                            "example": "2026-08-12T16:13:46.545Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "example": "2026-08-12T16:13:46.545Z"
                          },
                          "lessons": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "number",
                                  "example": 3
                                },
                                "moduleId": {
                                  "type": "number",
                                  "example": 4
                                },
                                "title": {
                                  "type": "string",
                                  "example": "Test Lesson"
                                },
                                "description": {
                                  "type": "object"
                                },
                                "content": {
                                  "type": "object"
                                },
                                "videoUrl": {
                                  "type": "object"
                                },
                                "order": {
                                  "type": "number",
                                  "example": 1
                                },
                                "createdAt": {
                                  "type": "string",
                                  "example": "2026-08-12T16:13:46.566Z"
                                },
                                "updatedAt": {
                                  "type": "string",
                                  "example": "2026-08-12T16:13:46.566Z"
                                }
                              }
                            }
                          },
                          "quizzes": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "number",
                                  "example": 3
                                },
                                "moduleId": {
                                  "type": "number",
                                  "example": 4
                                },
                                "title": {
                                  "type": "string",
                                  "example": "Test Quiz"
                                },
                                "description": {
                                  "type": "object"
                                },
                                "createdAt": {
                                  "type": "string",
                                  "example": "2026-08-12T16:13:46.591Z"
                                },
                                "updatedAt": {
                                  "type": "string",
                                  "example": "2026-08-12T16:13:46.591Z"
                                }
                              }
                            }
                          },
                          "quests": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "number",
                                  "example": 3
                                },
                                "moduleId": {
                                  "type": "number",
                                  "example": 4
                                },
                                "title": {
                                  "type": "string",
                                  "example": "Test Quest"
                                },
                                "description": {
                                  "type": "object"
                                },
                                "createdAt": {
                                  "type": "string",
                                  "example": "2026-08-12T16:13:46.605Z"
                                },
                                "updatedAt": {
                                  "type": "string",
                                  "example": "2026-08-12T16:13:46.605Z"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/api/lessons": {
      "get": {
        "summary": "Get Lessons",
        "tags": [
          "Lessons"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Lessons retrieved successfully"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number",
                            "example": 1
                          },
                          "moduleId": {
                            "type": "number",
                            "example": 1
                          },
                          "title": {
                            "type": "string",
                            "example": "Pengenalan HTML dan Struktur Dokumen"
                          },
                          "description": {
                            "type": "string",
                            "example": "Mempelajari dasar HTML dan struktur dokumen HTML"
                          },
                          "content": {
                            "type": "string",
                            "example": "HTML adalah bahasa markup untuk membuat struktur halaman web."
                          },
                          "videoUrl": {
                            "type": "string",
                            "example": "https://youtube.com/watch?v=example"
                          },
                          "order": {
                            "type": "number",
                            "example": 1
                          },
                          "createdAt": {
                            "type": "string",
                            "example": "2026-08-12T12:01:30.718Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "example": "2026-08-12T12:03:37.129Z"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create Lesson (Admin)",
        "tags": [
          "Lessons"
        ],
        "responses": {
          "201": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Lesson created successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 4
                        },
                        "moduleId": {
                          "type": "number",
                          "example": 4
                        },
                        "title": {
                          "type": "string",
                          "example": "New Lesson"
                        },
                        "description": {
                          "type": "object"
                        },
                        "content": {
                          "type": "object"
                        },
                        "videoUrl": {
                          "type": "object"
                        },
                        "order": {
                          "type": "number",
                          "example": 2
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:47.933Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:47.933Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "moduleId": {
                    "type": "number",
                    "example": 4
                  },
                  "title": {
                    "type": "string",
                    "example": "New Lesson"
                  },
                  "order": {
                    "type": "number",
                    "example": 2
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/lessons/{id}": {
      "get": {
        "summary": "Get Lesson By ID",
        "tags": [
          "Lessons"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Lesson retrieved successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 3
                        },
                        "moduleId": {
                          "type": "number",
                          "example": 4
                        },
                        "title": {
                          "type": "string",
                          "example": "Test Lesson"
                        },
                        "description": {
                          "type": "object"
                        },
                        "content": {
                          "type": "object"
                        },
                        "videoUrl": {
                          "type": "object"
                        },
                        "order": {
                          "type": "number",
                          "example": 1
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:46.566Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:46.566Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "patch": {
        "summary": "Update Lesson (Admin)",
        "tags": [
          "Lessons"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Lesson updated successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 3
                        },
                        "moduleId": {
                          "type": "number",
                          "example": 4
                        },
                        "title": {
                          "type": "string",
                          "example": "Updated Lesson Title"
                        },
                        "description": {
                          "type": "object"
                        },
                        "content": {
                          "type": "object"
                        },
                        "videoUrl": {
                          "type": "object"
                        },
                        "order": {
                          "type": "number",
                          "example": 1
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:46.566Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:47.959Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "example": "Updated Lesson Title"
                  }
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete Lesson (Admin)",
        "tags": [
          "Lessons"
        ],
        "responses": {
          "404": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": false
                    },
                    "message": {
                      "type": "string",
                      "example": "Lesson not found"
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/api/lessons/module/{id}": {
      "get": {
        "summary": "Get Lessons by Module",
        "tags": [
          "Lessons"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Lessons retrieved successfully"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number",
                            "example": 3
                          },
                          "moduleId": {
                            "type": "number",
                            "example": 4
                          },
                          "title": {
                            "type": "string",
                            "example": "Test Lesson"
                          },
                          "description": {
                            "type": "object"
                          },
                          "content": {
                            "type": "object"
                          },
                          "videoUrl": {
                            "type": "object"
                          },
                          "order": {
                            "type": "number",
                            "example": 1
                          },
                          "createdAt": {
                            "type": "string",
                            "example": "2026-08-12T16:13:46.566Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "example": "2026-08-12T16:13:46.566Z"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/api/quizzes": {
      "get": {
        "summary": "Get Quizzes",
        "tags": [
          "Quizzes"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Quizzes retrieved successfully"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number",
                            "example": 3
                          },
                          "moduleId": {
                            "type": "number",
                            "example": 4
                          },
                          "title": {
                            "type": "string",
                            "example": "Test Quiz"
                          },
                          "description": {
                            "type": "object"
                          },
                          "createdAt": {
                            "type": "string",
                            "example": "2026-08-12T16:13:46.591Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "example": "2026-08-12T16:13:46.591Z"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      },
      "post": {
        "summary": "Create Quiz (Admin)",
        "tags": [
          "Quizzes"
        ],
        "responses": {
          "201": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Quiz created successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 4
                        },
                        "moduleId": {
                          "type": "number",
                          "example": 4
                        },
                        "title": {
                          "type": "string",
                          "example": "New Quiz"
                        },
                        "description": {
                          "type": "object"
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:48.027Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:48.027Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "moduleId": {
                    "type": "number",
                    "example": 4
                  },
                  "title": {
                    "type": "string",
                    "example": "New Quiz"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/quizzes/{id}": {
      "get": {
        "summary": "Get Quiz By ID",
        "tags": [
          "Quizzes"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Quiz retrieved successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 3
                        },
                        "moduleId": {
                          "type": "number",
                          "example": 4
                        },
                        "title": {
                          "type": "string",
                          "example": "Test Quiz"
                        },
                        "description": {
                          "type": "object"
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:46.591Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:46.591Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "patch": {
        "summary": "Update Quiz (Admin)",
        "tags": [
          "Quizzes"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Quiz updated successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 3
                        },
                        "moduleId": {
                          "type": "number",
                          "example": 4
                        },
                        "title": {
                          "type": "string",
                          "example": "Updated Quiz Title"
                        },
                        "description": {
                          "type": "object"
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:46.591Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:48.055Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "example": "Updated Quiz Title"
                  }
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete Quiz (Admin)",
        "tags": [
          "Quizzes"
        ],
        "responses": {
          "404": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": false
                    },
                    "message": {
                      "type": "string",
                      "example": "Quiz not found"
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/api/quizzes/module/{id}": {
      "get": {
        "summary": "Get Quizzes by Module",
        "tags": [
          "Quizzes"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Quizzes retrieved successfully"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number",
                            "example": 3
                          },
                          "moduleId": {
                            "type": "number",
                            "example": 4
                          },
                          "title": {
                            "type": "string",
                            "example": "Test Quiz"
                          },
                          "description": {
                            "type": "object"
                          },
                          "createdAt": {
                            "type": "string",
                            "example": "2026-08-12T16:13:46.591Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "example": "2026-08-12T16:13:46.591Z"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/api/quests": {
      "get": {
        "summary": "Get Quests",
        "tags": [
          "Quests"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Quests retrieved successfully"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number",
                            "example": 3
                          },
                          "moduleId": {
                            "type": "number",
                            "example": 4
                          },
                          "title": {
                            "type": "string",
                            "example": "Test Quest"
                          },
                          "description": {
                            "type": "object"
                          },
                          "createdAt": {
                            "type": "string",
                            "example": "2026-08-12T16:13:46.605Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "example": "2026-08-12T16:13:46.605Z"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      },
      "post": {
        "summary": "Create Quest (Admin)",
        "tags": [
          "Quests"
        ],
        "responses": {
          "201": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Quest created successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 4
                        },
                        "moduleId": {
                          "type": "number",
                          "example": 4
                        },
                        "title": {
                          "type": "string",
                          "example": "New Quest"
                        },
                        "description": {
                          "type": "object"
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:48.111Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:48.111Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "moduleId": {
                    "type": "number",
                    "example": 4
                  },
                  "title": {
                    "type": "string",
                    "example": "New Quest"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/quests/{id}": {
      "get": {
        "summary": "Get Quest By ID",
        "tags": [
          "Quests"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Quest retrieved successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 3
                        },
                        "moduleId": {
                          "type": "number",
                          "example": 4
                        },
                        "title": {
                          "type": "string",
                          "example": "Test Quest"
                        },
                        "description": {
                          "type": "object"
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:46.605Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:46.605Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "patch": {
        "summary": "Update Quest (Admin)",
        "tags": [
          "Quests"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Quest updated successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 3
                        },
                        "moduleId": {
                          "type": "number",
                          "example": 4
                        },
                        "title": {
                          "type": "string",
                          "example": "Updated Quest Title"
                        },
                        "description": {
                          "type": "object"
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:46.605Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:48.137Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "example": "Updated Quest Title"
                  }
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete Quest (Admin)",
        "tags": [
          "Quests"
        ],
        "responses": {
          "404": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": false
                    },
                    "message": {
                      "type": "string",
                      "example": "Quest not found"
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/api/quests/module/{id}": {
      "get": {
        "summary": "Get Quests by Module",
        "tags": [
          "Quests"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Module quests retrieved successfully"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number",
                            "example": 3
                          },
                          "moduleId": {
                            "type": "number",
                            "example": 4
                          },
                          "title": {
                            "type": "string",
                            "example": "Test Quest"
                          },
                          "description": {
                            "type": "object"
                          },
                          "createdAt": {
                            "type": "string",
                            "example": "2026-08-12T16:13:46.605Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "example": "2026-08-12T16:13:46.605Z"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/api/exams": {
      "get": {
        "summary": "Get Exams",
        "tags": [
          "Exams"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Exams retrieved successfully"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number",
                            "example": 1
                          },
                          "courseId": {
                            "type": "number",
                            "example": 2
                          },
                          "title": {
                            "type": "string",
                            "example": "Final Exam"
                          },
                          "description": {
                            "type": "string",
                            "example": "Ujian akhir course"
                          },
                          "duration": {
                            "type": "number",
                            "example": 15
                          },
                          "passingScore": {
                            "type": "number",
                            "example": 80
                          },
                          "createdAt": {
                            "type": "string",
                            "example": "2026-08-12T13:21:05.221Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "example": "2026-08-12T13:21:05.221Z"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      },
      "post": {
        "summary": "Create Exam (Admin)",
        "tags": [
          "Exams"
        ],
        "responses": {
          "201": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Exam created successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 2
                        },
                        "courseId": {
                          "type": "number",
                          "example": 2
                        },
                        "title": {
                          "type": "string",
                          "example": "New Exam"
                        },
                        "description": {
                          "type": "object"
                        },
                        "duration": {
                          "type": "object"
                        },
                        "passingScore": {
                          "type": "object"
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:48.355Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:48.355Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "courseId": {
                    "type": "number",
                    "example": 2
                  },
                  "title": {
                    "type": "string",
                    "example": "New Exam"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/exams/{id}": {
      "get": {
        "summary": "Get Exam By ID",
        "tags": [
          "Exams"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Exam retrieved successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 1
                        },
                        "courseId": {
                          "type": "number",
                          "example": 2
                        },
                        "title": {
                          "type": "string",
                          "example": "Final Exam"
                        },
                        "description": {
                          "type": "string",
                          "example": "Ujian akhir course"
                        },
                        "duration": {
                          "type": "number",
                          "example": 15
                        },
                        "passingScore": {
                          "type": "number",
                          "example": 80
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T13:21:05.221Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T13:21:05.221Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      },
      "patch": {
        "summary": "Update Exam (Admin)",
        "tags": [
          "Exams"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Exam updated successfully"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number",
                          "example": 1
                        },
                        "courseId": {
                          "type": "number",
                          "example": 2
                        },
                        "title": {
                          "type": "string",
                          "example": "Updated Exam Title"
                        },
                        "description": {
                          "type": "string",
                          "example": "Ujian akhir course"
                        },
                        "duration": {
                          "type": "number",
                          "example": 15
                        },
                        "passingScore": {
                          "type": "number",
                          "example": 80
                        },
                        "createdAt": {
                          "type": "string",
                          "example": "2026-08-12T13:21:05.221Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "example": "2026-08-12T16:13:48.379Z"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "example": "Updated Exam Title"
                  }
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete Exam (Admin)",
        "tags": [
          "Exams"
        ],
        "responses": {
          "404": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": false
                    },
                    "message": {
                      "type": "string",
                      "example": "Exam not found"
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/api/exams/course/{id}": {
      "get": {
        "summary": "Get Exams by Course",
        "tags": [
          "Exams"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Course exams retrieved successfully"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number",
                            "example": 1
                          },
                          "courseId": {
                            "type": "number",
                            "example": 2
                          },
                          "title": {
                            "type": "string",
                            "example": "Final Exam"
                          },
                          "description": {
                            "type": "string",
                            "example": "Ujian akhir course"
                          },
                          "duration": {
                            "type": "number",
                            "example": 15
                          },
                          "passingScore": {
                            "type": "number",
                            "example": 80
                          },
                          "createdAt": {
                            "type": "string",
                            "example": "2026-08-12T13:21:05.221Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "example": "2026-08-12T13:21:05.221Z"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ]
      }
    },
    "/api/enrollments/my": {
      "get": {
        "summary": "Get My Enrollments",
        "tags": [
          "Enrollments"
        ],
        "responses": {
          "200": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": true
                    },
                    "message": {
                      "type": "string",
                      "example": "Enrollments retrieved successfully"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "number",
                            "example": 1
                          },
                          "userId": {
                            "type": "number",
                            "example": 1
                          },
                          "courseId": {
                            "type": "number",
                            "example": 2
                          },
                          "status": {
                            "type": "string",
                            "example": "ENROLLED"
                          },
                          "progress": {
                            "type": "number",
                            "example": 40
                          },
                          "enrolledAt": {
                            "type": "string",
                            "example": "2026-08-12T01:49:27.409Z"
                          },
                          "completedAt": {
                            "type": "object"
                          },
                          "course": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "number",
                                "example": 2
                              },
                              "title": {
                                "type": "string",
                                "example": "Updated Course Title"
                              },
                              "slug": {
                                "type": "string",
                                "example": "belajar-pemrograman-web"
                              },
                              "description": {
                                "type": "string",
                                "example": "Belajar pemrograman web modern menggunakan HTML, CSS, JavaScript, dan framework."
                              },
                              "thumbnail": {
                                "type": "string",
                                "example": "https://example.com/images/web-programming.jpg"
                              },
                              "level": {
                                "type": "string",
                                "example": "INTERMEDIATE"
                              },
                              "status": {
                                "type": "string",
                                "example": "PUBLISHED"
                              },
                              "createdAt": {
                                "type": "string",
                                "example": "2026-08-11T17:26:58.695Z"
                              },
                              "updatedAt": {
                                "type": "string",
                                "example": "2026-08-12T16:13:47.456Z"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ]
      }
    },
    "/api/enrollments": {
      "post": {
        "summary": "Enroll in Course",
        "tags": [
          "Enrollments"
        ],
        "responses": {
          "500": {
            "description": "Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean",
                      "example": false
                    },
                    "message": {
                      "type": "string",
                      "example": "Internal server error"
                    }
                  }
                }
              }
            }
          }
        },
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "courseId": {
                    "type": "number",
                    "example": 2
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
