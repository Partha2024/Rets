# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy and restore project
COPY Rets-API/*.csproj Rets-API/
RUN dotnet restore Rets-API/Rets-API.csproj

# Copy the rest of the app code
COPY Rets-API/ Rets-API/
WORKDIR /source/Rets-API

# Publish app to /app/publish
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Expose default port
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# Run the app
ENTRYPOINT ["dotnet", "Rets-API.dll"]
