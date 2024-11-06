const AuthInputSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {children}
      </div>
    </section>
  );
};
export default AuthInputSection;
