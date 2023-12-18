const useDb = () => {

  //get
  const getDb = async (t:string) => {
      const {data} = await useFetch(`/api/db?table=${t}`);
      return data;
  }

  //post
  const postDb = async (t:string,val:{}) => {
    console.log(val);
    const{ data } = await useFetch(`/api/db?table=${t}`, {
      method: "POST",
      body: val,
    });
    return data;
  }

  //put
  const putDb = async (t:string,tg:number,val:{}) => {
    const{ data } = await useFetch(`/api/db?table=${t}&target=${tg}`, {
      method: "PUT",
      body: val,
    });
    return data;
  }

  //delete
  const delDb = async (t:string,tg:number) => {
    const{ data } = await useFetch(`/api/db?table=${t}&target=${tg}`, {
      method: "DELETE",
    });
    return data;
  }

  return {
    getDb,postDb,putDb,delDb
  }
}
export default useDb;