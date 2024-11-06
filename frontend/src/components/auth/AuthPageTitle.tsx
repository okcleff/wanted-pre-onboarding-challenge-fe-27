const AuthPageTitle = ({ title }: { title: string }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {title}
      </h1>
    </div>
  );
};
export default AuthPageTitle;
