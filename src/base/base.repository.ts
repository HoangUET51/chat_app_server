abstract class BaseRepository<E> {
  async insertOrUpdate(model: E, data: any) {
    try {
      if (data._id) {
        await model.updateOne({ _id: data._id }, { data }, { upsert: true });
      }
    } catch (error) {
      return null;
    }
  }
}

export default BaseRepository;
