# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
WORKDIR /source

# Copy csproj and restore
COPY rets-API/rets-API.csproj ./rets-API/
WORKDIR /source/rets-API
RUN dotnet restore

# Copy everything and publish
WORKDIR /source
COPY . .
WORKDIR /source/rets-API
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0-preview
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "rets-API.dll"]
