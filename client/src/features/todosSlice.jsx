import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/todo`);

      const data = await res.json();

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todo/remove",
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:4000/todo/${id}`, {
        method: "DELETE",
      });

      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const patchTodo = createAsyncThunk(
  "todo/patch",
  async (todo, thunkAPI) => {
    try {
      const fav = await fetch(`http://localhost:4000/todo/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });
      return await fav.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addTodo = createAsyncThunk("todo/add", async (text, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:4000/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ text }),
    });
    return await res.json();
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.loading = action.payload.error;
      });
    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => {
        return todo._id !== action.payload;
      });
    });
    // .addCase(removeTodo.pending, (state, action) => {
    //   state.todos = state.todos.filter((todo) => {
    //     return todo._id !== action.payload;
    //   });
    // })
    // .addCase(removeTodo.rejected, (state, action) => {
    //   state.todos = state.todos.filter((todo) => {
    //     return todo._id !== action.payload;
    //   });
    // });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
    // .addCase(addTodo.pending, (state, action) => {
    //   state.todos = state.todos.filter((todo) => {
    //     return todo._id !== action.payload;
    //   });
    // })
    // .addCase(addTodo.rejected, (state, action) => {
    //   state.todos = state.todos.filter((todo) => {
    //     return todo._id !== action.payload;
    //   });
    // });
    builder.addCase(patchTodo.fulfilled, (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo._id === action.payload._id) {
          return action.payload
        }
        return todo
      })
    });
  },
});

export default todosSlice.reducer;
