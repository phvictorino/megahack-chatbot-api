import app from './app';

app.listen(process.env.PORT || 3003, () => {
  console.log('🚀 Server started on port 3003!');
});
