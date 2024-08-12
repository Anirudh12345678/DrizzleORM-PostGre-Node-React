import { useMutation, useQuery } from "@apollo/client";
import { deleteArticle, USERS, deleteUser } from "./queries.js";
import { AddCircleOutline, DeleteOutlined, EditOutlined } from "@mui/icons-material";
import React from "react";

function App() {
  const {data,loading,error} = useQuery(USERS);
  const [delArt] = useMutation(deleteArticle)
  const [delUser] = useMutation(deleteUser)
  if(loading) return <h1>Loading..</h1>
  const res = data.getUsers
  console.log(res)
  return (
    <>
    <div className='w-full h-[1000px] bg-[#173B45] flex flex-col p-10 justify-center gap-2'>
        <a href="/addUser" className="ml-[50%] pb-[10px]"><AddCircleOutline fontSize="medium" /></a>
        <div className="w-full h-full grid grid-cols-4 auto-rows-auto gap-5">
          {res.map((item) => {
            return (
              <div className="w-[300px] h-[350px] rounded shadow-md flex flex-col bg-[#B43F3F] p-5 gap-5">
                <div className="text-left text-3xl text-[#F8EDED]">
                  {item.name}
                  <a href={'/editUser/' + item.id}><EditOutlined className="cursor-pointer ml-[20px] opacity-0 hover:opacity-100" fontSize="small"/></a>
                  <button onClick={async () => {
                    await delUser({ variables: { Id: item.id } });
                    window.location.reload();
                  } }><DeleteOutlined className="cursor-pointer opacity-0 hover:opacity-100" fontSize="small" /></button>
                </div>
                <p className="text-left text-xl text-[#F8EDED]">Popularity: {item.popularity} </p>
                <div className="text-center text-2xl text-[#F8EDED]">Best Works
                  {item.articles.length < 4 && <a href={'/createArticle/' + item.id}><AddCircleOutline className="cursor-pointer ml-[20px]" fontSize="small" /></a>}
                </div>
                <div className="bg-[#FF8225] w-full h-[150px] flex flex-col p-1 gap-2 justify-center rounded shadow-md">
                  {item.articles.map((a, index) => {
                    if (index < 4) {
                      return (
                        <p className="text-[#F8EDED] text-left ml-[20px]">
                          <div className="flex flex-row gap-5">
                            {a.link}
                            <div>
                              <button onClick={async () => {
                                await delArt({ variables: { deleteArticleId: a.id } });
                                window.location.reload();
                              } }><DeleteOutlined className="cursor-pointer opacity-0 hover:opacity-100" fontSize="small" /></button>
                            </div>
                          </div>
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div></>
  );
}

export default App;
